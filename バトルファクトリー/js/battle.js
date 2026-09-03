class BattleSystem {
    constructor(typeChart, movesData) {
        this.typeChart = typeChart;
        this.movesData = movesData;
    }

    // ランク補正込みのステータス実数値を計算
    getStatWithRank(baseStat, rank) {
        if (!rank) return baseStat;
        if (rank > 0) {
            return Math.floor(baseStat * ((2 + rank) / 2));
        } else if (rank < 0) {
            return Math.floor(baseStat * (2 / (2 - rank)));
        }
        return baseStat;
    }

    // ランク補正込みの命中率を計算
    getAccuracyWithRank(baseAccuracy, accRank, evaRank) {
        if (baseAccuracy === null) return 100; // 必中技
        let rank = (accRank || 0) - (evaRank || 0);
        if (rank > 6) rank = 6;
        if (rank < -6) rank = -6;
        
        let multiplier = 1.0;
        if (rank >= 0) {
            multiplier = (3 + rank) / 3;
        } else {
            multiplier = 3 / (3 - rank);
        }
        return Math.floor(baseAccuracy * multiplier);
    }

    // すばやさの比較（まひ、スカーフ、ランク補正を考慮）
    compareSpeed(poke1, poke2) {
        let spd1 = this.getStatWithRank(poke1.stats.speed, poke1.statRanks.speed);
        let spd2 = this.getStatWithRank(poke2.stats.speed, poke2.statRanks.speed);
        
        if (poke1.status === 'paralyze') spd1 = Math.floor(spd1 / 2);
        if (poke2.status === 'paralyze') spd2 = Math.floor(spd2 / 2);

        if (poke1.item === 'こだわりスカーフ') spd1 = Math.floor(spd1 * 1.5);
        if (poke2.item === 'こだわりスカーフ') spd2 = Math.floor(spd2 * 1.5);

        if (spd1 > spd2) return 1;
        if (spd1 < spd2) return -1;
        return Math.random() >= 0.5 ? 1 : -1; // 同速は50%の乱数
    }

    // タイプ相性の倍率を取得
    getTypeMultiplier(moveType, targetTypes) {
        let multiplier = 1.0;
        for (let t of targetTypes) {
            if (this.typeChart[moveType] && this.typeChart[moveType][t] !== undefined) {
                multiplier *= this.typeChart[moveType][t];
            }
        }
        return multiplier;
    }

    // 命中判定
    checkHit(attacker, defender, move) {
        if (move.accuracy === null) return true;
        const accuracy = this.getAccuracyWithRank(move.accuracy, attacker.statRanks.accuracy, defender.statRanks.evasion);
        return (Math.random() * 100) < accuracy;
    }

    // 行動可能かどうかの判定（状態異常・ひるみ）
    checkCanMove(pokemon) {
        if (pokemon.currentHp <= 0) return { canMove: false };

        if (pokemon.isFlinching) {
            pokemon.isFlinching = false;
            return { canMove: false, message: `${pokemon.name} は ひるんで 動けない！` };
        }

        switch (pokemon.status) {
            case 'sleep':
                if (Math.random() < 0.33) {
                    pokemon.status = 'none';
                    return { canMove: true, message: `${pokemon.name} は 目を覚ました！` };
                }
                return { canMove: false, message: `${pokemon.name} は ぐうぐう 眠っている` };
            case 'freeze':
                if (Math.random() < 0.2) {
                    pokemon.status = 'none';
                    return { canMove: true, message: `${pokemon.name} は こおりが とけた！` };
                }
                return { canMove: false, message: `${pokemon.name} は こおってしまって 動けない！` };
            case 'paralyze':
                if (Math.random() < 0.25) {
                    return { canMove: false, message: `${pokemon.name} は からだが しびれて 動けない！` };
                }
                break;
        }
        return { canMove: true };
    }

    // ダメージ計算（ランク、タイプ相性、持ち物、乱数を考慮）
    calculateDamage(attacker, defender, move) {
        if (move.category === '変化') return { damage: 0, messages: [] };

        let atkStat = move.category === '物理' 
            ? this.getStatWithRank(attacker.stats.attack, attacker.statRanks.attack) 
            : this.getStatWithRank(attacker.stats.sp_attack, attacker.statRanks.sp_attack);
            
        let defStat = move.category === '物理' 
            ? this.getStatWithRank(defender.stats.defense, defender.statRanks.defense) 
            : this.getStatWithRank(defender.stats.sp_defense, defender.statRanks.sp_defense);

        if (move.category === '物理' && attacker.status === 'burn') {
            atkStat = Math.floor(atkStat / 2);
        }

        // 持ち物補正
        if (attacker.item === 'こだわりハチマキ' && move.category === '物理') atkStat = Math.floor(atkStat * 1.5);
        if (attacker.item === 'こだわりメガネ' && move.category === '特殊') atkStat = Math.floor(atkStat * 1.5);
        if (attacker.item === 'いのちのたま') atkStat = Math.floor(atkStat * 1.3);
        
        if (defender.item === 'しんかのきせき') {
            defStat = Math.floor(defStat * 1.5);
        }
        if (defender.item === 'とつげきチョッキ' && move.category === '特殊') {
            defStat = Math.floor(defStat * 1.5);
        }

        const level = 50;
        let baseDamage = Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * move.power * atkStat / defStat) / 50) + 2;

        // 乱数補正 (0.85 ~ 1.0)
        baseDamage = Math.floor(baseDamage * (85 + Math.floor(Math.random() * 16)) / 100);

        // タイプ一致補正
        if (attacker.types.includes(move.type)) {
            baseDamage = Math.floor(baseDamage * 1.5);
        }

        const messages = [];
        
        // タイプ相性補正
        const typeMod = this.getTypeMultiplier(move.type, defender.types);
        if (typeMod === 0) {
            return { damage: 0, messages: [`${defender.name} には 効果がないようだ...`] };
        }
        if (typeMod > 1) messages.push('効果は ばつぐんだ！');
        if (typeMod < 1) messages.push('効果は いまひとつのようだ');
        
        baseDamage = Math.floor(baseDamage * typeMod);

        return { damage: baseDamage, messages };
    }

    // 技の追加効果処理（回復、状態異常、ひるみ、ランク変化）
    applySecondaryEffects(attacker, defender, move, damage) {
        const effects = [];

        if (move.recoil) {
            const recoilDamage = Math.max(1, Math.floor(damage * move.recoil));
            effects.push({ type: 'heal', amount: -recoilDamage, target: 'attacker', message: `${attacker.name} は 反動の ダメージを受けた！` });
        }
        
        if (move.drain) {
            const healAmount = Math.max(1, Math.floor(damage * move.drain));
            effects.push({ type: 'heal', amount: healAmount, target: 'attacker', message: `${attacker.name} の 体力が 回復した！` });
        }

        if (move.effect && move.effectChance && defender.status === 'none') {
            if (Math.random() * 100 < move.effectChance) {
                if (['burn', 'paralyze', 'poison', 'bad_poison', 'sleep', 'freeze'].includes(move.effect)) {
                    effects.push({ type: 'status', status: move.effect });
                }
            }
        }

        if (move.effect === 'flinch' && move.effectChance) {
            if (Math.random() * 100 < move.effectChance) {
                effects.push({ type: 'flinch' });
            }
        }

        if (move.effect && (move.effect.includes('_up') || move.effect.includes('_down'))) {
            const chance = move.effectChance || 100;
            if (Math.random() * 100 <= chance) {
                const target = move.target === 'self' ? 'attacker' : 'defender';
                const parts = move.effect.split('_');
                const change = parts.includes('up') ? (parseInt(parts[parts.length-1]) || 1) : -(parseInt(parts[parts.length-1]) || 1);
                const stat = parts[0]; 
                
                if (['attack', 'defense', 'sp_attack', 'sp_defense', 'speed', 'accuracy', 'evasion'].includes(stat)) {
                    effects.push({ type: 'rank', stat, change, target });
                }
            }
        }

        // 専用積み技の例外処理
        if (move.effect === 'quiver_dance') {
            effects.push({ type: 'rank', stat: 'sp_attack', change: 1, target: 'attacker' });
            effects.push({ type: 'rank', stat: 'sp_defense', change: 1, target: 'attacker' });
            effects.push({ type: 'rank', stat: 'speed', change: 1, target: 'attacker' });
        }

        return effects;
    }

    // ターン終了時のダメージ処理（やけど、どくなど）
    applyEndOfTurnEffects(pokemon) {
        if (pokemon.currentHp <= 0) return null;

        if (pokemon.status === 'burn') {
            return { damage: Math.max(1, Math.floor(pokemon.maxHp / 16)), message: `${pokemon.name} は やけどの ダメージを受けている！` };
        }
        if (pokemon.status === 'poison' || pokemon.status === 'bad_poison') {
            return { damage: Math.max(1, Math.floor(pokemon.maxHp / 8)), message: `${pokemon.name} は どくの ダメージを受けている！` };
        }

        return null;
    }
}