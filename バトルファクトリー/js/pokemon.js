// js/pokemon.js

class Pokemon {
    constructor(baseData, setInfo, allMovesData) {
        this.id = setInfo.pokemon_id;
        this.name = baseData.name;
        this.types = baseData.types;
        
        const getAnimUrl = (url) => {
            if (!url) return url;
            return url.replace('/pokemon/', '/pokemon/other/showdown/').replace('.png', '.gif');
        };

        this.frontSpriteUrl = getAnimUrl(baseData.sprite_url) || baseData.sprite_url;
        this.backSpriteUrl = getAnimUrl(baseData.sprite_back_url || baseData.sprite_url) || baseData.sprite_url;
        this.fallbackFrontUrl = baseData.sprite_url;
        this.fallbackBackUrl = baseData.sprite_back_url || baseData.sprite_url;

        this.nature = setInfo.nature;
        this.item = setInfo.item;
        
        this.moves = setInfo.moves.map(moveName => {
            const moveData = allMovesData[moveName];
            if (moveData) {
                return { name: moveName, ...moveData };
            } else {
                return { name: moveName, power: 0, accuracy: null, type: 'ノーマル', category: '変化' };
            }
        });

        const ivs = setInfo.ivs || { hp: 31, attack: 31, defense: 31, sp_attack: 31, sp_defense: 31, speed: 31 };
        const evs = setInfo.evs || { hp: 0, attack: 0, defense: 0, sp_attack: 0, sp_defense: 0, speed: 0 };

        this.maxHp = this.calculateHp(baseData.base_stats.hp, ivs.hp, evs.hp);
        
        this.stats = {
            attack: this.calculateStat('attack', baseData.base_stats.attack, ivs.attack, evs.attack),
            defense: this.calculateStat('defense', baseData.base_stats.defense, ivs.defense, evs.defense),
            sp_attack: this.calculateStat('sp_attack', baseData.base_stats.sp_attack, ivs.sp_attack, evs.sp_attack),
            sp_defense: this.calculateStat('sp_defense', baseData.base_stats.sp_defense, ivs.sp_defense, evs.sp_defense),
            speed: this.calculateStat('speed', baseData.base_stats.speed, ivs.speed, evs.speed)
        };

        this.currentHp = this.maxHp;
        this.status = 'none';
        
        this._originalSetInfo = setInfo;
        
        // 初回の戦闘用ステータス初期化
        this.resetBattleState();
    }

    calculateHp(base, iv, ev) {
        if (base === 1) return 1;
        const core = Math.floor(base * 2 + iv + Math.floor(ev / 4));
        return Math.floor(core * 50 / 100) + 10 + 50;
    }

    calculateStat(statName, base, iv, ev) {
        const core = Math.floor(base * 2 + iv + Math.floor(ev / 4));
        const preNatureStat = Math.floor(core * 50 / 100) + 5;
        const multiplier = this.getNatureMultiplier(this.nature, statName);
        return Math.floor(preNatureStat * multiplier);
    }

    getNatureMultiplier(nature, statName) {
        const natures = {
            "いじっぱり": { up: "attack", down: "sp_attack" },
            "ようき": { up: "speed", down: "sp_attack" },
            "ひかえめ": { up: "sp_attack", down: "attack" },
            "おくびょう": { up: "speed", down: "attack" },
            "ずぶとい": { up: "defense", down: "attack" },
            "わんぱく": { up: "defense", down: "sp_attack" },
            "おだやか": { up: "sp_defense", down: "attack" },
            "しんちょう": { up: "sp_defense", down: "sp_attack" },
            "むじゃき": { up: "speed", down: "sp_defense" },
            "せっかち": { up: "speed", down: "defense" },
            "ゆうかん": { up: "attack", down: "speed" },
            "れいせい": { up: "sp_attack", down: "speed" },
            "のんき": { up: "defense", down: "speed" },
            "なまいき": { up: "sp_defense", down: "speed" }
        };
        if (!natures[nature]) return 1.0;
        if (natures[nature].up === statName) return 1.1;
        if (natures[nature].down === statName) return 0.9;
        return 1.0;
    }

    // 交代時・復活時などの戦闘用フラグリセット
    resetBattleState() {
        this.isFlinching = false;
        this.isProtected = false; 
        this.hasSubstitute = false;
        this.substituteHp = 0;
        this.tauntTurns = 0;
        this.statRanks = { attack: 0, defense: 0, sp_attack: 0, sp_defense: 0, speed: 0, accuracy: 0, evasion: 0 };
        
        // 猛毒の経過ターン
        this.badPoisonTurn = 0;
        
        // 場に出た最初のターン判定（ねこだまし等に必要）
        this.isFirstTurn = true;
        
        // 交代で解除される特殊状態
        this.volatiles = {
            leechSeed: false,
            confusionTurns: 0,
            encoreTurns: 0,
            encoredMove: null
        };
    }

    // バトル完全終了時の全回復リセット
    reset() {
        this.currentHp = this.maxHp;
        this.status = 'none';
        
        // はたきおとされたアイテム等の復元
        if (this._originalSetInfo.item !== this.item) {
            this.item = this._originalSetInfo.item;
        }

        this.resetBattleState();
    }
}
