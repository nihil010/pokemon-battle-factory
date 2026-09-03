// js/main.js

class GameController {
    constructor() {
        this.ui = new UIManager();
        this.battle = null;
        this.data = {};
        
        this.playerParty = [];
        this.enemyParty = [];
        this.activePlayerIdx = 0;
        this.activeEnemyIdx = 0;
        
        this.winCount = 0;
        this.turnCommand = null;
    }

    init() {
        this.data = {
            pokemon: typeof POKEMON_DATA !== 'undefined' ? POKEMON_DATA : {},
            moves: typeof MOVES_DATA !== 'undefined' ? MOVES_DATA : {},
            typeChart: typeof TYPE_CHART !== 'undefined' ? TYPE_CHART : {},
            factorySets: typeof FACTORY_SETS !== 'undefined' ? FACTORY_SETS : []
        };
        
        this.battle = new BattleSystem(this.data.typeChart, this.data.moves);
        this.setupEventListeners();
        this.startDraftPhase();
    }

    setupEventListeners() {
        for (let i = 0; i < 4; i++) {
            document.getElementById(`move-${i}`).addEventListener('click', () => {
                this.turnCommand = { type: 'move', moveIndex: i };
                this.executeTurn();
            });
        }
        document.getElementById('btn-switch-pokemon').addEventListener('click', () => this.showSwitchScreen(false));
        document.getElementById('btn-cancel-switch').addEventListener('click', () => this.ui.switchScreen('screen-battle'));
        document.getElementById('btn-load').addEventListener('click', () => {
            const code = document.getElementById('save-code-input').value;
            this.loadGame(code);
        });
    }

    startDraftPhase() {
        this.ui.switchScreen('screen-selection');
        
        const poolSets = this.getRandomSets(6);
        const poolPokemons = poolSets.map(set => this.createPokemonInstance(set));
        
        const winDisplay = document.getElementById('win-streak-display');
        if (winDisplay) winDisplay.textContent = `${this.winCount}連勝中`;

        this.ui.buildSelectionScreen(poolPokemons, (selectedIndexes) => {
            this.playerParty = selectedIndexes.map(idx => poolPokemons[idx]);
            const enemyPool = this.getRandomSets(3);
            this.enemyParty = enemyPool.map(set => this.createPokemonInstance(set));
            this.startBattle();
        });
    }

    getRandomSets(count) {
        const sets = [...this.data.factorySets];
        const result = [];
        for (let i = 0; i < count; i++) {
            if (sets.length === 0) break;
            const randIdx = Math.floor(Math.random() * sets.length);
            result.push(sets.splice(randIdx, 1)[0]);
        }
        return result;
    }

    createPokemonInstance(setInfo) {
        const baseData = this.data.pokemon[setInfo.pokemon_id];
        return new Pokemon(baseData, setInfo, this.data.moves);
    }

    async startBattle() {
        this.activePlayerIdx = 0;
        this.activeEnemyIdx = 0;
        
        this.playerParty.forEach(p => p.reset());
        this.enemyParty.forEach(p => p.reset());

        this.ui.switchScreen('screen-battle');
        this.updateFieldUI();
        
        await this.ui.showMessage(`あいては ${this.getActiveEnemy().name} を くりだした！`, 1500);
        await this.ui.showMessage(`ゆけっ！ ${this.getActivePlayer().name}！`, 1000);
        
        this.promptCommand();
    }

    getActivePlayer() { return this.playerParty[this.activePlayerIdx]; }
    getActiveEnemy() { return this.enemyParty[this.activeEnemyIdx]; }

    updateFieldUI() {
        this.ui.updateBattleField(this.getActivePlayer(), this.getActiveEnemy());
    }

    promptCommand() {
        this.ui.showCommands(this.getActivePlayer().moves);
    }

    showSwitchScreen(isFainted) {
        this.ui.switchScreen('screen-switch');
        const container = document.getElementById('party-list');
        container.innerHTML = '';
        
        const cancelBtn = document.getElementById('btn-cancel-switch');
        cancelBtn.style.display = isFainted ? 'none' : 'block';

        this.playerParty.forEach((poke, idx) => {
            const el = document.createElement('div');
            el.className = 'trade-item';
            el.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${poke.frontSpriteUrl}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <div>${poke.name} (HP: ${Math.max(0, Math.floor(poke.currentHp))}/${poke.maxHp}) @${poke.item || 'なし'}</div>
                </div>
            `;
            
            if (poke.currentHp <= 0 || idx === this.activePlayerIdx) {
                el.style.backgroundColor = '#ccc';
                el.style.color = '#888';
                el.style.cursor = 'not-allowed';
            } else {
                el.onclick = () => {
                    this.ui.switchScreen('screen-battle');
                    if (isFainted) {
                        this.executeSwitch(idx, true);
                    } else {
                        this.turnCommand = { type: 'switch', switchIndex: idx };
                        this.executeTurn();
                    }
                };
            }
            container.appendChild(el);
        });
    }

    async executeSwitch(newIdx, isFainted = false) {
        this.activePlayerIdx = newIdx;
        this.getActivePlayer().statRanks = { attack: 0, defense: 0, sp_attack: 0, sp_defense: 0, speed: 0, accuracy: 0, evasion: 0 };
        this.getActivePlayer().isProtected = false; // 交代時にまもる解除
        this.updateFieldUI();
        await this.ui.showMessage(`ゆけっ！ ${this.getActivePlayer().name}！`, 1000);
        
        if (isFainted) {
            this.promptCommand();
        }
    }

    async executeTurn() {
        this.ui.hideCommands();
        const player = this.getActivePlayer();
        const enemy = this.getActiveEnemy();

        // ターン開始時に前ターンの「まもる」を解除
        player.isProtected = false;
        enemy.isProtected = false;

        let enemyAction = { type: 'move', move: enemy.moves[Math.floor(Math.random() * enemy.moves.length)] };
        let playerAction = this.turnCommand;
        if (playerAction.type === 'move') {
            playerAction.move = player.moves[playerAction.moveIndex];
        }

        if (playerAction.type === 'switch') {
            await this.ui.showMessage(`${player.name} もどれ！`, 1000);
            await this.executeSwitch(playerAction.switchIndex);
            
            await this.processAction(this.getActiveEnemy(), this.getActivePlayer(), enemyAction.move, 'enemy', 'player', playerAction, true);
            
            if (this.getActiveEnemy().currentHp <= 0) await this.handleFaint('enemy');
            if (this.getActivePlayer().currentHp <= 0) await this.handleFaint('player');
        } else {
            const speedCompare = this.battle.compareSpeed(player, enemy);
            
            // まもるの優先度(+4)を強制的に適用
            const pMovePrio = playerAction.move.name === 'まもる' ? 4 : (playerAction.move.priority || 0);
            const eMovePrio = enemyAction.move.name === 'まもる' ? 4 : (enemyAction.move.priority || 0);
            
            let isPlayerFirst = false;
            if(pMovePrio > eMovePrio) isPlayerFirst = true;
            else if(pMovePrio < eMovePrio) isPlayerFirst = false;
            else isPlayerFirst = speedCompare >= 0;

            const first = isPlayerFirst ? { poke: player, move: playerAction.move, side: 'player', action: playerAction } : { poke: enemy, move: enemyAction.move, side: 'enemy', action: enemyAction };
            const second = isPlayerFirst ? { poke: enemy, move: enemyAction.move, side: 'enemy', action: enemyAction } : { poke: player, move: playerAction.move, side: 'player', action: playerAction };

            await this.processAction(first.poke, second.poke, first.move, first.side, second.side, second.action, false);
            
            if (first.poke.currentHp <= 0 || second.poke.currentHp <= 0) {
                if (first.poke.currentHp <= 0) await this.handleFaint(first.side);
                if (second.poke.currentHp <= 0) await this.handleFaint(second.side);
                return;
            }

            await this.processAction(second.poke, first.poke, second.move, second.side, first.side, first.action, true);
            
            if (first.poke.currentHp <= 0 || second.poke.currentHp <= 0) {
                if (second.poke.currentHp <= 0) await this.handleFaint(second.side);
                if (first.poke.currentHp <= 0) await this.handleFaint(first.side);
                return;
            }
        }

        if(this.getActivePlayer().currentHp > 0 && this.getActiveEnemy().currentHp > 0){
            await this.processEndOfTurn();
            
            if (this.getActivePlayer().currentHp <= 0) await this.handleFaint('player');
            else if (this.getActiveEnemy().currentHp <= 0) await this.handleFaint('enemy');
            else this.promptCommand();
        }
    }

    async processAction(attacker, defender, move, atkSide, defSide, defenderAction, isDefenderMoved) {
        // ★追加: 「まもる」発動処理
        if (move.name === 'まもる') {
            attacker.isProtected = true;
            await this.ui.showMessage(`${attacker.name} は 守りの 体勢に入った！`, 1500);
            return;
        }

        if (move.name === 'ふいうち') {
            const willAttack = defenderAction && defenderAction.type === 'move' && defenderAction.move.category !== '変化';
            if (isDefenderMoved || !willAttack) {
                await this.ui.showMessage(`${attacker.name} の ${move.name}！`, 1200);
                await this.ui.showMessage(`しかし うまくきまらなかった！`, 1500);
                return;
            }
        }

        const moveCheck = this.battle.checkCanMove(attacker);
        if (moveCheck.message) await this.ui.showMessage(moveCheck.message, 1500);
        if (!moveCheck.canMove) return;

        await this.ui.showMessage(`${attacker.name} の ${move.name}！`, 1200);

        // ★追加: 相手が「まもる」状態の場合、攻撃を無効化する
        if (defender.isProtected) {
            await this.ui.showMessage(`${defender.name} は 攻撃から 身を守った！`, 1500);
            return;
        }

        if (!this.battle.checkHit(attacker, defender, move)) {
            await this.ui.showMessage(`しかし 攻撃は 外れた！`, 1500);
            return;
        }

        const result = this.battle.calculateDamage(attacker, defender, move);
        
        let actualDamage = 0;
        if (result.damage > 0) {
            actualDamage = Math.min(defender.currentHp, result.damage);
            defender.currentHp = Math.max(0, defender.currentHp - result.damage);
            this.ui.updateHpBar(defSide, defender);
            for (let msg of result.messages) await this.ui.showMessage(msg, 1200);
        }

        const effects = this.battle.applySecondaryEffects(attacker, defender, move, actualDamage);
        for (let effect of effects) {
            if (defender.currentHp > 0) {
                if (effect.type === 'status') {
                    defender.status = effect.status;
                    const sName = {'burn':'やけど', 'paralyze':'まひ', 'poison':'どく', 'bad_poison':'もうどく', 'sleep':'ねむり', 'freeze':'こおり'}[effect.status];
                    this.ui.updateStatusBadge(defSide, defender.status);
                    await this.ui.showMessage(`${defender.name} は ${sName} 状態に なった！`, 1500);
                }
                if (effect.type === 'flinch') defender.isFlinching = true;
            }
            
            if (effect.type === 'rank') {
                const targetPoke = effect.target === 'attacker' ? attacker : defender;
                if (targetPoke.currentHp > 0) {
                    const statName = {'attack':'こうげき', 'defense':'ぼうぎょ', 'sp_attack':'とくこう', 'sp_defense':'とくぼう', 'speed':'すばやさ', 'accuracy':'めいちゅう', 'evasion':'かいひ'}[effect.stat];
                    const dirName = effect.change > 0 ? "上がった" : "下がった";
                    
                    let rankObj = targetPoke.statRanks[effect.stat] || 0;
                    if(effect.change > 0 && rankObj < 6) { 
                        targetPoke.statRanks[effect.stat] = rankObj + effect.change; 
                        await this.ui.showMessage(`${targetPoke.name} の ${statName} が ${dirName}！`, 1500); 
                    }
                    else if(effect.change < 0 && rankObj > -6) { 
                        targetPoke.statRanks[effect.stat] = rankObj + effect.change; 
                        await this.ui.showMessage(`${targetPoke.name} の ${statName} が ${dirName}！`, 1500); 
                    }
                }
            }
            
            if (effect.type === 'heal' && attacker.currentHp > 0) {
                attacker.currentHp = Math.max(0, Math.min(attacker.maxHp, attacker.currentHp + effect.amount));
                this.ui.updateHpBar(atkSide, attacker);
                await this.ui.showMessage(effect.message, 1500);
            }
        }
    }

    async processEndOfTurn() {
        const p1 = this.getActivePlayer();
        const p2 = this.getActiveEnemy();

        const p1Effect = this.battle.applyEndOfTurnEffects(p1);
        if (p1Effect) {
            p1.currentHp = Math.max(0, p1.currentHp - p1Effect.damage);
            this.ui.updateHpBar('player', p1);
            await this.ui.showMessage(p1Effect.message, 1500);
        }

        const p2Effect = this.battle.applyEndOfTurnEffects(p2);
        if (p2Effect) {
            p2.currentHp = Math.max(0, p2.currentHp - p2Effect.damage);
            this.ui.updateHpBar('enemy', p2);
            await this.ui.showMessage(p2Effect.message, 1500);
        }
    }

    async handleFaint(side) {
        const faintedPoke = side === 'player' ? this.getActivePlayer() : this.getActiveEnemy();
        await this.ui.showMessage(`${faintedPoke.name} は たおれた！`, 1500);

        if (side === 'player') {
            const hasAlive = this.playerParty.some(p => p.currentHp > 0);
            if (hasAlive) {
                this.showSwitchScreen(true);
            } else {
                await this.ui.showMessage(`目の前が 真っ暗になった...`, 2000);
                this.gameOver();
            }
        } else {
            const hasAlive = this.enemyParty.some(p => p.currentHp > 0);
            if (hasAlive) {
                const aliveIdxs = this.enemyParty.map((p, i) => p.currentHp > 0 ? i : -1).filter(i => i !== -1);
                this.activeEnemyIdx = aliveIdxs[Math.floor(Math.random() * aliveIdxs.length)];
                this.getActiveEnemy().statRanks = { attack: 0, defense: 0, sp_attack: 0, sp_defense: 0, speed: 0, accuracy: 0, evasion: 0 };
                this.getActiveEnemy().isProtected = false;
                this.updateFieldUI();
                await this.ui.showMessage(`あいては ${this.getActiveEnemy().name} を くりだした！`, 1500);
                this.promptCommand();
            } else {
                await this.ui.showMessage(`あいてとの しょうぶに 勝った！`, 2000);
                this.winBattle();
            }
        }
    }

    winBattle() {
        this.winCount++;
        this.showTradeScreen();
    }

    gameOver() {
        alert(`連勝記録: ${this.winCount} で終了しました。再読み込みして最初からやり直してください。`);
    }

    showTradeScreen() {
        this.ui.switchScreen('screen-trade');
        this.ui.buildTradeScreen(this.playerParty, this.enemyParty, (tradeType, playerIdx, enemyIdx) => {
            
            if (tradeType === 'pokemon') {
                // ポケモンごとの交換
                const temp = this.playerParty[playerIdx];
                this.playerParty[playerIdx] = this.enemyParty[enemyIdx];
                this.enemyParty[enemyIdx] = temp;
                this.ui.showMessage('ポケモンを こうかんした！', 1000).then(() => {
                    this.prepareNextBattle();
                });
                
            } else if (tradeType === 'item') {
                // もちものだけ交換
                const tempItem = this.playerParty[playerIdx].item;
                this.playerParty[playerIdx].item = this.enemyParty[enemyIdx].item;
                this.enemyParty[enemyIdx].item = tempItem;
                
                // セーブデータ用のもちもの情報も更新する
                const tempOrigItem = this.playerParty[playerIdx]._originalSetInfo.item;
                this.playerParty[playerIdx]._originalSetInfo.item = this.enemyParty[enemyIdx]._originalSetInfo.item;
                this.enemyParty[enemyIdx]._originalSetInfo.item = tempOrigItem;

                this.ui.showMessage('もちものを こうかんした！', 1000).then(() => {
                    this.prepareNextBattle();
                });
                
            } else {
                // こうかんしない（スキップ）
                this.prepareNextBattle();
            }
        });
    }


    prepareNextBattle() {
        const enemyPool = this.getRandomSets(3);
        this.enemyParty = enemyPool.map(set => this.createPokemonInstance(set));
        
        this.saveGame();
        
        this.ui.switchScreen('screen-selection');
        document.getElementById('draft-pool').innerHTML = '';
        
        const startBtn = document.getElementById('btn-start-battle');
        startBtn.textContent = '次の バトルへ！';
        startBtn.disabled = false;
        startBtn.onclick = () => this.startBattle();

        const winDisplay = document.getElementById('win-streak-display');
        if (winDisplay) winDisplay.textContent = `${this.winCount}連勝中`;
        document.querySelector('#screen-selection .panel-header').childNodes[0].textContent = 'つぎの しょうぶへ すすみます ';
    }

    saveGame() {
        const saveData = {
            winCount: this.winCount,
            partySets: this.playerParty.map(p => p._originalSetInfo)
        };
        const jsonStr = JSON.stringify(saveData);
        const saveCode = btoa(encodeURIComponent(jsonStr));
        
        const display = document.getElementById('save-code-display');
        display.innerHTML = `【セーブコードを発行しました。連勝数: ${this.winCount}】<br><textarea readonly style="width: 90%; font-size: 0.8em; margin-top:5px; height: 50px;">${saveCode}</textarea>`;
    }

    loadGame(code) {
        if(!code) return;
        try {
            const jsonStr = decodeURIComponent(atob(code));
            const saveData = JSON.parse(jsonStr);
            
            this.winCount = saveData.winCount;
            this.playerParty = saveData.partySets.map(setInfo => this.createPokemonInstance(setInfo));
            
            const enemyPool = this.getRandomSets(3);
            this.enemyParty = enemyPool.map(set => this.createPokemonInstance(set));

            const display = document.getElementById('save-code-display');
            display.style.color = "blue";
            display.textContent = `連勝数 ${this.winCount} のデータをロードしました！`;
            
            document.getElementById('draft-pool').innerHTML = '';
            const startBtn = document.getElementById('btn-start-battle');
            startBtn.disabled = false;
            startBtn.onclick = () => this.startBattle();

            const winDisplay = document.getElementById('win-streak-display');
            if (winDisplay) winDisplay.textContent = `${this.winCount}連勝中`;

        } catch(e) {
            alert('セーブコードが不正です。');
        }
    }
}

window.onload = () => {
    const game = new GameController();
    game.init();
};
