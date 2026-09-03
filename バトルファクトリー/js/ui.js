// js/ui.js

class UIManager {
    constructor() {
        this.messageBox = document.getElementById('message-box');
        this.commandBox = document.getElementById('command-box');
        
        this.playerName = document.getElementById('player-name');
        this.playerHpBar = document.getElementById('player-hp-bar');
        this.playerHpText = document.getElementById('player-hp-text');
        this.playerSprite = document.getElementById('player-sprite');
        
        this.enemyName = document.getElementById('enemy-name');
        this.enemyHpBar = document.getElementById('enemy-hp-bar');
        this.enemySprite = document.getElementById('enemy-sprite');
    }

    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('active');
        });
        const target = document.getElementById(screenId);
        target.classList.remove('hidden');
        target.classList.add('active');
    }

    showMessage(text, waitTime = 1000) {
        return new Promise(resolve => {
            this.messageBox.textContent = text;
            setTimeout(resolve, waitTime);
        });
    }

    showCommands(moves) {
        this.messageBox.classList.add('hidden');
        this.commandBox.classList.remove('hidden');
        
        for (let i = 0; i < 4; i++) {
            const btn = document.getElementById(`move-${i}`);
            const nameEl = document.getElementById(`move-name-${i}`);
            const detailsEl = document.getElementById(`move-details-${i}`);
            
            if (moves[i] && moves[i].name !== '---') {
                const m = moves[i];
                btn.disabled = false;
                nameEl.textContent = m.name;
                
                const powerStr = m.power ? m.power : '-';
                const accStr = m.accuracy ? m.accuracy : '-';
                detailsEl.innerHTML = `
                    <span class="type-badge type-${m.type}">${m.type}</span>
                    <span style="margin-left:5px;">${m.category} | 威力:${powerStr} 命中:${accStr}</span>
                `;
            } else {
                btn.disabled = true;
                nameEl.textContent = '---';
                detailsEl.innerHTML = '';
            }
        }
    }

    hideCommands() {
        this.commandBox.classList.add('hidden');
        this.messageBox.classList.remove('hidden');
    }

    updateBattleField(playerPokemon, enemyPokemon) {
        this.playerName.textContent = playerPokemon.name;
        // ★追加: 読み込みエラー時に静止画に切り替える
        this.playerSprite.onerror = () => { this.playerSprite.src = playerPokemon.fallbackBackUrl; };
        this.playerSprite.src = playerPokemon.backSpriteUrl; 
        
        this.enemyName.textContent = enemyPokemon.name;
        // ★追加: 読み込みエラー時に静止画に切り替える
        this.enemySprite.onerror = () => { this.enemySprite.src = enemyPokemon.fallbackFrontUrl; };
        this.enemySprite.src = enemyPokemon.frontSpriteUrl;

        const enemyTypesEl = document.getElementById('enemy-types');
        if (enemyTypesEl) enemyTypesEl.textContent = enemyPokemon.types.join(' / ');
        
        const playerTypesEl = document.getElementById('player-types');
        if (playerTypesEl) playerTypesEl.textContent = playerPokemon.types.join(' / ');
        
        const playerItemEl = document.getElementById('player-item');
        if (playerItemEl) playerItemEl.textContent = '@' + (playerPokemon.item || 'なし');

        this.updateHpBar('player', playerPokemon);
        this.updateHpBar('enemy', enemyPokemon);
        this.updateStatusBadge('player', playerPokemon.status);
        this.updateStatusBadge('enemy', enemyPokemon.status);
    }

    updateHpBar(side, pokemon) {
        const percent = Math.max(0, (pokemon.currentHp / pokemon.maxHp) * 100);
        const bar = side === 'player' ? this.playerHpBar : this.enemyHpBar;
        
        bar.style.backgroundColor = percent > 50 ? '#4cd964' : (percent > 20 ? '#ffcc00' : '#ff3b30');
        bar.style.width = `${percent}%`;

        if (side === 'player') {
            this.playerHpText.textContent = `${Math.ceil(pokemon.currentHp)} / ${pokemon.maxHp}`;
        }
    }

    updateStatusBadge(side, status) {
        const container = side === 'player' 
            ? document.querySelector('.player-status .name-bar') 
            : document.querySelector('.enemy-status .name-bar');
        
        if (!container) return;

        let badge = container.querySelector('.status-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'status-badge';
            container.appendChild(badge);
        }

        const statusConfig = {
            'none': { text: '', color: 'transparent' },
            'burn': { text: 'やけど', color: '#ff3b30' },
            'paralyze': { text: 'まひ', color: '#ffcc00' },
            'poison': { text: 'どく', color: '#a250ba' },
            'bad_poison': { text: 'もうどく', color: '#8e44ad' },
            'sleep': { text: 'ねむり', color: '#8e8e93' },
            'freeze': { text: 'こおり', color: '#5ac8fa' }
        };

        const config = statusConfig[status] || statusConfig['none'];
        badge.textContent = config.text;
        badge.style.backgroundColor = config.color;
        badge.style.display = status === 'none' ? 'none' : 'inline-block';
    }
    
    buildSelectionScreen(poolList, onSelectCallback) {
        const container = document.getElementById('draft-pool');
        if (!container) return;
        container.innerHTML = ''; 

        let selectedIndexes = [];

        poolList.forEach((poke, index) => {
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            
            const movesHtml = poke.moves.map(m => m.name).join('<br>');
            // ★追加: onerror で静止画に切り替える処理
            card.innerHTML = `
                <img src="${poke.frontSpriteUrl}" onerror="this.onerror=null; this.src='${poke.fallbackFrontUrl}'" alt="${poke.name}">
                <div style="font-weight: bold;">${poke.name}</div>
                <div style="font-size: 0.8em; color: #d35400;">@${poke.item || 'なし'}</div>
                <div style="font-size: 0.7em; margin-top: 4px; color: #555;">${movesHtml}</div>
            `;
            
            card.addEventListener('click', () => {
                if (selectedIndexes.includes(index)) {
                    selectedIndexes = selectedIndexes.filter(i => i !== index);
                    card.classList.remove('selected');
                } else if (selectedIndexes.length < 3) {
                    selectedIndexes.push(index);
                    card.classList.add('selected');
                }
                
                const startBtn = document.getElementById('btn-start-battle');
                startBtn.disabled = selectedIndexes.length !== 3;
                startBtn.onclick = () => onSelectCallback(selectedIndexes);
            });

            container.appendChild(card);
        });
    }

    buildTradeScreen(playerParty, enemyParty, onTradeCallback) {
        const pContainer = document.getElementById('player-party-trade');
        const eContainer = document.getElementById('enemy-party-trade');
        const originalBtn = document.getElementById('btn-skip-trade');
        
        if (!pContainer || !eContainer) return;

        pContainer.innerHTML = '';
        eContainer.innerHTML = '';

        // ボタンを動的に生成するためのグループ枠を作成
        let btnGroup = document.getElementById('trade-btn-group');
        if (!btnGroup) {
            btnGroup = document.createElement('div');
            btnGroup.id = 'trade-btn-group';
            btnGroup.style.display = 'flex';
            btnGroup.style.flexDirection = 'column';
            btnGroup.style.gap = '10px';
            btnGroup.style.marginTop = '15px';
            originalBtn.parentNode.insertBefore(btnGroup, originalBtn);
            originalBtn.style.display = 'none'; // 古いボタンは隠す
        }

        let selectedPlayerIdx = null;
        let selectedEnemyIdx = null;

        const checkReady = () => {
            btnGroup.innerHTML = ''; // ボタンを一旦リセット

            if (selectedPlayerIdx !== null && selectedEnemyIdx !== null) {
                // 両方選択されている場合の3つのボタン
                const btnPokemon = document.createElement('button');
                btnPokemon.className = 'ds-button';
                btnPokemon.textContent = 'ポケモンを こうかんする';
                btnPokemon.onclick = () => onTradeCallback('pokemon', selectedPlayerIdx, selectedEnemyIdx);
                
                const btnItem = document.createElement('button');
                btnItem.className = 'ds-button';
                btnItem.textContent = 'もちものだけ こうかんする';
                btnItem.onclick = () => onTradeCallback('item', selectedPlayerIdx, selectedEnemyIdx);

                const btnSkip = document.createElement('button');
                btnSkip.className = 'ds-button';
                btnSkip.textContent = 'やっぱり こうかんしない';
                btnSkip.onclick = () => onTradeCallback('skip', null, null);
                
                btnGroup.appendChild(btnPokemon);
                btnGroup.appendChild(btnItem);
                btnGroup.appendChild(btnSkip);
            } else {
                // 未選択時はスキップボタンのみ
                const btnSkip = document.createElement('button');
                btnSkip.className = 'ds-button';
                btnSkip.textContent = 'こうかんしない';
                btnSkip.onclick = () => onTradeCallback('skip', null, null);
                btnGroup.appendChild(btnSkip);
            }
        };

        // 味方の描画
        playerParty.forEach((poke, idx) => {
            const el = document.createElement('div');
            el.className = 'trade-item';
            el.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${poke.frontSpriteUrl}" onerror="this.onerror=null; this.src='${poke.fallbackFrontUrl}'" style="width: 50px; height: 50px; margin-right: 10px;">
                    <div>${poke.name} (@${poke.item || 'なし'})</div>
                </div>
            `;
            el.onclick = () => {
                Array.from(pContainer.children).forEach(c => c.classList.remove('selected'));
                el.classList.add('selected');
                selectedPlayerIdx = idx;
                checkReady();
            };
            pContainer.appendChild(el);
        });

        // 相手の描画
        enemyParty.forEach((poke, idx) => {
            const el = document.createElement('div');
            el.className = 'trade-item';
            el.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${poke.frontSpriteUrl}" onerror="this.onerror=null; this.src='${poke.fallbackFrontUrl}'" style="width: 50px; height: 50px; margin-right: 10px;">
                    <div>${poke.name} (@${poke.item || 'なし'})</div>
                </div>
            `;
            el.onclick = () => {
                Array.from(eContainer.children).forEach(c => c.classList.remove('selected'));
                el.classList.add('selected');
                selectedEnemyIdx = idx;
                checkReady();
            };
            eContainer.appendChild(el);
        });
        
        checkReady(); 
    }
}
