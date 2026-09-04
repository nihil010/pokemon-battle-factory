// js/battle.js

class BattleSystem {
    constructor(typeChart, movesData) {
        this.typeChart = typeChart;
        this.movesData = movesData;
    }

    // すばやさ比較（同速の場合はランダム）
    compareSpeed(p1, p2) {
        const speed1 = this.calculateActualStat(p1, 'speed') * (p1.status === 'paralyze' ? 0.5 : 1);
        const speed2 = this.calculateActualStat(p2, 'speed') * (p2.status === 'paralyze' ? 0.5 : 1);
        if (speed1 === speed2) return Math.random() < 0.5 ? 1 : -1;
        return speed1 - speed2;
    }

    // ランク補正込みの実数値を計算
    calculateActualStat(pokemon, statName) {
        const base = pokemon.stats[statName];
        const rank = pokemon.statRanks[statName] || 0;
        const multiplier = rank >= 0 ? (2 + rank) / 2 : 2 / (2 - rank);
        return Math.floor(base * multiplier);
    }

    // タイプ相性の計算
    getTypeEffectiveness(moveType, targetTypes) {
        if (!this.typeChart[moveType]) return 1;
        let effectiveness = 1;
        for (let type of targetTypes) {
            if (this.typeChart[moveType][type] !== undefined) {
                effectiveness *= this.typeChart[moveType][type];
            }
        }
        return effectiveness;
    }

    // 行動可能判定（状態異常、ひるみ、ちょうはつ、こんらん等）
    checkCanMove(pokemon, move) {
        if (pokemon.currentHp <= 0) return { canMove: false };

        // ねこだまし・であいがしら 等の初手限定技の判定
        if (move && ['ねこだまし', 'であいがしら'].includes(move.name) && !pokemon.isFirstTurn) {
            return { canMove: false, message: `しかし うまくきまらなかった！` };
        }

        // ちょうはつ
        if (pokemon.tauntTurns > 0 && move && move.category === '変化') {
            return { canMove: false, message: `${pokemon.name} は 挑発されていて 技が出せない！` };
        }

        // こおり
        if (pokemon.status === 'freeze') {
            if (Math.random() < 0.2 || (move && ['かえんぐるま', 'フレアドライブ', 'ねっとう'].includes(move.name))) {
                pokemon.status = 'none';
                return { canMove: true, preMessage: `${pokemon.name} の こおりが とけた！` };
            }
            return { canMove: false, message: `${pokemon.name} は こおってしまって 動けない！` };
        }

        // ねむり
        if (pokemon.status === 'sleep') {
            if (Math.random() < 0.33) { // 簡易的な起床判定（約33%）
                pokemon.status = 'none';
                return { canMove: true, preMessage: `${pokemon.name} は 目を覚ました！` };
            }
            return { canMove: false, message: `${pokemon.name} は ぐうぐう 眠っている` };
        }

        // まひ
        if (pokemon.status === 'paralyze' && Math.random() < 0.25) {
            return { canMove: false, message: `${pokemon.name} は 体がしびれて 動けない！` };
        }

        // ひるみ
        if (pokemon.isFlinching) {
            pokemon.isFlinching = false;
            return { canMove: false, message: `${pokemon.name} は ひるんで 動けない！` };
        }

        // こんらん
        if (pokemon.volatiles && pokemon.volatiles.confusionTurns > 0) {
            pokemon.volatiles.confusionTurns--;
            if (pokemon.volatiles.confusionTurns === 0) {
                return { canMove: true, preMessage: `${pokemon.name} の こんらんが とけた！` };
            } else {
                if (Math.random() < 0.33) {
                    // 自傷ダメージ計算 (威力40の物理技として計算)
                    const level = 50;
                    const atk = this.calculateActualStat(pokemon, 'attack');
                    const def = this.calculateActualStat(pokemon, 'defense');
                    let dmg = Math.floor((Math.floor((level * 2 / 5) + 2) * 40 * atk / def) / 50) + 2;
                    dmg = Math.floor(dmg * (0.85 + Math.random() * 0.15));
                    return { canMove: false, hitSelfDamage: dmg, message: `${pokemon.name} は わけもわからず 自分を攻撃した！` };
                } else {
                    return { canMove: true, preMessage: `${pokemon.name} は こんらんしている！` };
                }
            }
        }

        return { canMove: true };
    }

    // 命中判定
    checkHit(attacker, defender, move) {
        if (!move.accuracy || move.accuracy === '-') return true; // 必中技
        
        let accRank = (attacker.statRanks.accuracy || 0) - (defender.statRanks.evasion || 0);
        accRank = Math.max(-6, Math.min(6, accRank));
        const multiplier = accRank >= 0 ? (3 + accRank) / 3 : 3 / (3 - accRank);
        
        let actualAccuracy = move.accuracy * multiplier;
        return (Math.random() * 100) <= actualAccuracy;
    }

    // ダメージ計算
    calculateDamage(attacker, defender, move) {
        if (move.category === '変化' || move.power === 0) return { damage: 0, messages: [] };

        const messages = [];
        const level = 50;
        let power = move.power;

        // はたきおとすの威力上昇（相手が持ち物を持っている場合）
        if (move.name === 'はたきおとす' && defender.item) {
            power = Math.floor(power * 1.5);
        }

        const isPhysical = move.category === '物理';
        let atkStat = this.calculateActualStat(attacker, isPhysical ? 'attack' : 'sp_attack');
        let defStat = this.calculateActualStat(defender, isPhysical ? 'defense' : 'sp_defense');

        // やけどによる物理攻撃半減
        if (isPhysical && attacker.status === 'burn' && move.name !== 'からげんき') {
            atkStat = Math.floor(atkStat / 2);
        }

        // ベースダメージ計算
        let damage = Math.floor((Math.floor((level * 2 / 5) + 2) * power * atkStat / defStat) / 50) + 2;

        // 急所判定 (1/24 = 約4.17%)
        let isCrit = Math.random() < (1 / 24);
        if (isCrit) {
            damage = Math.floor(damage * 1.5);
            messages.push('急所に 当たった！');
        }

        // 乱数 (0.85 〜 1.0)
        damage = Math.floor(damage * (0.85 + Math.random() * 0.15));

        // タイプ一致補正 (STAB)
        if (attacker.types.includes(move.type)) {
            damage = Math.floor(damage * 1.5);
        }

        // タイプ相性
        const effectiveness = this.getTypeEffectiveness(move.type, defender.types);
        if (effectiveness > 1) {
            damage = Math.floor(damage * effectiveness);
            messages.push('効果は ばつぐんだ！');
        } else if (effectiveness < 1 && effectiveness > 0) {
            damage = Math.floor(damage * effectiveness);
            messages.push('効果は いまひとつのようだ');
        } else if (effectiveness === 0) {
            return { damage: 0, messages: ['相手には 効果がないようだ…'] };
        }

        // 持ち物による火力補正（いのちのたま、こだわり系など）
        if (attacker.item === 'いのちのたま') damage = Math.floor(damage * 1.3);
        if (attacker.item === 'こだわりハチマキ' && isPhysical) damage = Math.floor(damage * 1.5);
        if (attacker.item === 'こだわりメガネ' && !isPhysical) damage = Math.floor(damage * 1.5);

        return { damage: Math.max(1, damage), messages };
    }

    // 追加効果・反動・交代技・持ち物無効化の適用
    applySecondaryEffects(attacker, defender, move, actualDamage) {
        const effects = [];

        // いのちのたま反動
        if (attacker.item === 'いのちのたま' && actualDamage > 0) {
            effects.push({ type: 'recoil', target: 'attacker', damage: Math.floor(attacker.maxHp / 10), message: `${attacker.name} は 命を削って 攻撃した！` });
        }

        // 通常の反動技 (フレアドライブなど)
        if (move.recoil && actualDamage > 0) {
            const recoilDmg = Math.floor(actualDamage * move.recoil);
            effects.push({ type: 'recoil', target: 'attacker', damage: recoilDmg, message: `${attacker.name} は 反動の ダメージを受けた！` });
        }

        // はたきおとす
        if (move.name === 'はたきおとす' && defender.item && defender.currentHp > 0 && actualDamage > 0) {
            effects.push({ type: 'remove_item', target: 'defender', message: `${defender.name} は ${defender.item} を はたき落とされた！` });
        }

        // 攻撃＋交代技 (とんぼがえり、ボルトチェンジ)
        if (['とんぼがえり', 'ボルトチェンジ'].includes(move.name) && actualDamage > 0) {
            effects.push({ type: 'switch_out', target: 'attacker' });
        }

        // 状態異常などの追加効果 (確率判定)
        if (move.effect && Math.random() * 100 <= (move.effectChance || 100)) {
            if (['burn', 'paralyze', 'poison', 'bad_poison', 'sleep', 'freeze'].includes(move.effect.type)) {
                if (defender.status === 'none') {
                    effects.push({ type: 'status', status: move.effect.type });
                }
            } else if (move.effect.type === 'flinch') {
                effects.push({ type: 'flinch' });
            } else if (move.effect.type === 'confusion') {
                effects.push({ type: 'confusion' });
            }
        }

        return effects;
    }

    // ターン終了時の定数ダメージ（状態異常、やどりぎ等）
    applyEndOfTurnEffects(pokemon) {
        if (pokemon.currentHp <= 0) return null;
        
        let damage = 0;
        let messages = [];

        // もうどく (経過ターンごとに 1/16 ずつ増加)
        if (pokemon.status === 'bad_poison') {
            pokemon.badPoisonTurn++;
            const ratio = Math.min(15, pokemon.badPoisonTurn); // 最大15/16
            damage += Math.max(1, Math.floor(pokemon.maxHp * ratio / 16));
            messages.push(`${pokemon.name} は 猛毒の ダメージを受けている！`);
        } 
        // 通常のどく・やけど (最大HPの1/8)
        else if (pokemon.status === 'poison' || pokemon.status === 'burn') {
            damage += Math.max(1, Math.floor(pokemon.maxHp / 8));
            const sName = pokemon.status === 'poison' ? 'どく' : 'やけど';
            messages.push(`${pokemon.name} は ${sName}の ダメージを受けている！`);
        }

        // やどりぎのタネ
        if (pokemon.volatiles && pokemon.volatiles.leechSeed) {
            const seedDmg = Math.max(1, Math.floor(pokemon.maxHp / 8));
            damage += seedDmg;
            messages.push(`${pokemon.name} は 体力を 奪われた！`);
            // ※吸い取った回復処理は main.js 側でハンドリングするためのフラグ
            pokemon.lastLeechSeedDamage = seedDmg; 
        }

        // 挑発ターンの消費
        if (pokemon.tauntTurns > 0) {
            pokemon.tauntTurns--;
            if (pokemon.tauntTurns === 0) {
                messages.push(`${pokemon.name} の 挑発が 解けた！`);
            }
        }

        if (damage > 0 || messages.length > 0) {
            return { damage, messages };
        }
        return null;
    }
}
