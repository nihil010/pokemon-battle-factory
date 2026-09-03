const FACTORY_SETS = [
  {
    "id": "venusaur_defensive",
    "pokemon_id": "3",
    "nature": "ずぶとい",
    "item": "くろいヘドロ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ギガドレイン", "ヘドロばくだん", "やどりぎのタネ", "まもる"]
  },
  {
    "id": "charizard_scarf",
    "pokemon_id": "6",
    "nature": "おくびょう",
    "item": "こだわりスカーフ",
    "evs": { "hp": 0, "attack": 0, "defense": 4, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["かえんほうしゃ", "エアスラッシュ", "きあいだま", "りゅうのはどう"]
  },
  {
    "id": "nidoqueen_tank",
    "pokemon_id": "31",
    "nature": "ずぶとい",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["だいちのちから", "ヘドロウェーブ", "れいとうビーム", "ステルスロック"]
  },
  {
    "id": "nidoking_sweeper",
    "pokemon_id": "34",
    "nature": "おくびょう",
    "item": "いのちのたま",
    "evs": { "hp": 0, "attack": 0, "defense": 4, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["だいちのちから", "ヘドロウェーブ", "れいとうビーム", "かえんほうしゃ"]
  },
  {
    "id": "clefable_calm_mind",
    "pokemon_id": "36",
    "nature": "ずぶとい",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ムーンフォース", "めいそう", "つきのひかり", "かえんほうしゃ"]
  },
  {
    "id": "ninetales_nasty_plot",
    "pokemon_id": "38",
    "nature": "おくびょう",
    "item": "もくたん",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["だいもんじ", "ソーラービーム", "わるだくみ", "おにび"]
  },
  {
    "id": "arcanine_band",
    "pokemon_id": "59",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["フレアドライブ", "インファイト", "ワイルドボルト", "しんそく"]
  },
  {
    "id": "alakazam_focus_sash",
    "pokemon_id": "65",
    "nature": "おくびょう",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["サイコキネシス", "シャドーボール", "きあいだま", "めいそう"]
  },
  {
    "id": "slowbro_physical_wall",
    "pokemon_id": "80",
    "nature": "ずぶとい",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ねっとう", "サイコキネシス", "れいとうビーム", "なまける"]
  },
  {
    "id": "magneton_eviolite",
    "pokemon_id": "82",
    "nature": "ひかえめ",
    "item": "しんかのきせき",
    "evs": { "hp": 252, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 4, "speed": 0 },
    "moves": ["10まんボルト", "ラスターカノン", "ボルトチェンジ", "トライアタック"]
  },
  {
    "id": "cloyster_shell_smash",
    "pokemon_id": "91",
    "nature": "いじっぱり",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["つららばり", "ロックブラスト", "こおりのつぶて", "からをやぶる"]
  },
  {
    "id": "gengar_focus_sash",
    "pokemon_id": "94",
    "nature": "おくびょう",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["シャドーボール", "ヘドロばくだん", "きあいだま", "みちづれ"]
  },
  {
    "id": "chansey_eviolite",
    "pokemon_id": "113",
    "nature": "ずぶとい",
    "item": "しんかのきせき",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ちきゅうなげ", "どくどく", "たまごうみ", "ステルスロック"]
  },
  {
    "id": "gyarados_dragon_dance",
    "pokemon_id": "130",
    "nature": "ようき",
    "item": "ラムのみ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["たきのぼり", "じしん", "こおりのキバ", "りゅうのまい"]
  },
  {
    "id": "lapras_assault_vest",
    "pokemon_id": "131",
    "nature": "ひかえめ",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 4, "speed": 0 },
    "moves": ["なみのり", "フリーズドライ", "ぜったいれいど", "こおりのつぶて"]
  },
  {
    "id": "aerodactyl_lead",
    "pokemon_id": "142",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ストーンエッジ", "ダブルウイング", "じしん", "ちょうはつ"]
  },
  {
    "id": "snorlax_curse",
    "pokemon_id": "143",
    "nature": "いじっぱり",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["のしかかり", "じしん", "ヘビーボンバー", "あくび"]
  },
  {
    "id": "zapdos_defensive",
    "pokemon_id": "145",
    "nature": "ずぶとい",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["10まんボルト", "ぼうふう", "ねっぷう", "はねやすめ"]
  },
  {
    "id": "dragonite_multiscale",
    "pokemon_id": "149",
    "nature": "いじっぱり",
    "item": "ラムのみ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["げきりん", "じしん", "しんそく", "りゅうのまい"]
  },
  {
    "id": "crobat_utility",
    "pokemon_id": "169",
    "nature": "ようき",
    "item": "くろいヘドロ",
    "evs": { "hp": 252, "attack": 4, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ブレイブバード", "クロスポイズン", "ちょうはつ", "はねやすめ"]
  },
  {
    "id": "lanturn_pivot",
    "pokemon_id": "171",
    "nature": "おだやか",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["ねっとう", "ボルトチェンジ", "れいとうビーム", "どくどく"]
  },
  {
    "id": "azumarill_huge_power",
    "pokemon_id": "184",
    "nature": "いじっぱり",
    "item": "オボンのみ",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["アクアブレイク", "じゃれつく", "アクアジェット", "ばかぢから"]
  },
  {
    "id": "quagsire_unaware",
    "pokemon_id": "195",
    "nature": "のんき",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ねっとう", "じしん", "どくどく", "じこさいせい"]
  },
  {
    "id": "umbreon_cleric",
    "pokemon_id": "197",
    "nature": "ずぶとい",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["イカサマ", "どくどく", "ねがいごと", "まもる"]
  },
  {
    "id": "scizor_band",
    "pokemon_id": "212",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 252, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["バレットパンチ", "とんぼがえり", "はたきおとす", "インファイト"]
  },
  {
    "id": "heracross_scarf",
    "pokemon_id": "214",
    "nature": "いじっぱり",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["インファイト", "メガホーン", "ストーンエッジ", "じしん"]
  },
  {
    "id": "corsola_wall",
    "pokemon_id": "222",
    "nature": "ずぶとい",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ねっとう", "ステルスロック", "じこさいせい", "ミラーコート"]
  },
  {
    "id": "skarmory_spikes",
    "pokemon_id": "227",
    "nature": "わんぱく",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ブレイブバード", "どくどく", "ステルスロック", "はねやすめ"]
  },
  {
    "id": "kingdra_specs",
    "pokemon_id": "230",
    "nature": "ひかえめ",
    "item": "こだわりメガネ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["ハイドロポンプ", "なみのり", "りゅうせいぐん", "れいとうビーム"]
  },
  {
    "id": "donphan_assault_vest",
    "pokemon_id": "232",
    "nature": "いじっぱり",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["じしん", "はたきおとす", "こおりのつぶて", "ダストシュート"]
  },
  {
    "id": "porygon2_eviolite",
    "pokemon_id": "233",
    "nature": "なまいき",
    "item": "しんかのきせき",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["トライアタック", "れいとうビーム", "どくどく", "じこさいせい"]
  },
  {
    "id": "smeargle_lead",
    "pokemon_id": "235",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["きのこのほうし", "ステルスロック", "ねばねばネット", "へんしん"]
  },
  {
    "id": "hitmontop_intimidate",
    "pokemon_id": "237",
    "nature": "いじっぱり",
    "item": "オボンのみ",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["インファイト", "マッハパンチ", "ねこだまし", "ストーンエッジ"]
  },
  {
    "id": "blissey_wall",
    "pokemon_id": "242",
    "nature": "ずぶとい",
    "item": "ばんのうがさ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ちきゅうなげ", "どくどく", "たまごうみ", "ステルスロック"]
  },
  {
    "id": "raikou_calm_mind",
    "pokemon_id": "243",
    "nature": "おくびょう",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 0, "sp_attack": 4, "sp_defense": 0, "speed": 252 },
    "moves": ["10まんボルト", "めいそう", "みがわり", "シャドーボール"]
  },
  {
    "id": "entei_band",
    "pokemon_id": "244",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["せいなるほのお", "ストーンエッジ", "じならし", "しんそく"]
  },
  {
    "id": "suicune_crocune",
    "pokemon_id": "245",
    "nature": "ずぶとい",
    "item": "カゴのみ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ねっとう", "めいそう", "ねむる", "れいとうビーム"]
  },
  {
    "id": "tyranitar_assault_vest",
    "pokemon_id": "248",
    "nature": "いじっぱり",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ストーンエッジ", "かみくだく", "じしん", "れいとうパンチ"]
  },
  {
    "id": "blaziken_life_orb",
    "pokemon_id": "257",
    "nature": "いじっぱり",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["フレアドライブ", "インファイト", "ブレイブバード", "まもる"]
  },
{
    "id": "swampert_tank",
    "pokemon_id": "260",
    "nature": "のんき",
    "item": "オボンのみ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["じしん", "ねっとう", "ステルスロック", "あくび"]
  },
  {
    "id": "pelipper_drizzle",
    "pokemon_id": "279",
    "nature": "ずぶとい",
    "item": "しめったいわ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ねっとう", "ぼうふう", "とんぼがえり", "はねやすめ"]
  },
  {
    "id": "gardevoir_scarf",
    "pokemon_id": "282",
    "nature": "おくびょう",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["サイコキネシス", "ムーンフォース", "シャドーボール", "トリック"]
  },
  {
    "id": "breloom_focus_sash",
    "pokemon_id": "286",
    "nature": "いじっぱり",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["タネマシンガン", "マッハパンチ", "がんせきふうじ", "きのこのほうし"]
  },
  {
    "id": "ninjask_baton_pass",
    "pokemon_id": "291",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 252, "attack": 4, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["シザークロス", "つるぎのまい", "まもる", "バトンタッチ"]
  },
  {
    "id": "shedinja_wonder_guard",
    "pokemon_id": "292",
    "nature": "さみしがり",
    "item": "きあいのタスキ",
    "evs": { "hp": 0, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ポルターガイスト", "かげうち", "シザークロス", "おにび"]
  },
  {
    "id": "torkoal_drought",
    "pokemon_id": "324",
    "nature": "のんき",
    "item": "あついいわ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ふんえん", "ステルスロック", "あくび", "クリアスモッグ"]
  },
  {
    "id": "milotic_defensive",
    "pokemon_id": "350",
    "nature": "ずぶとい",
    "item": "かえんだま",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ねっとう", "れいとうビーム", "じこさいせい", "くろいきり"]
  },
  {
    "id": "dusclops_eviolite",
    "pokemon_id": "356",
    "nature": "のんき",
    "item": "しんかのきせき",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ナイトヘッド", "おにび", "いたみわけ", "トリックルーム"]
  },
  {
    "id": "walrein_stall",
    "pokemon_id": "365",
    "nature": "ずぶとい",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ぜったいれいど", "なみのり", "まもる", "みがわり"]
  },
  {
    "id": "salamence_dragon_dance",
    "pokemon_id": "373",
    "nature": "ようき",
    "item": "ラムのみ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["げきりん", "ダブルウイング", "じしん", "りゅうのまい"]
  },
  {
    "id": "metagross_assault_vest",
    "pokemon_id": "376",
    "nature": "いじっぱり",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["コメットパンチ", "バレットパンチ", "じしん", "れいとうパンチ"]
  },
  {
    "id": "registeel_tank",
    "pokemon_id": "379",
    "nature": "しんちょう",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["アイアンヘッド", "どくどく", "まもる", "ステルスロック"]
  },
  {
    "id": "latias_defensive",
    "pokemon_id": "380",
    "nature": "おくびょう",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["サイコキネシス", "れいとうビーム", "めいそう", "じこさいせい"]
  },
  {
    "id": "latios_specs",
    "pokemon_id": "381",
    "nature": "おくびょう",
    "item": "こだわりメガネ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["りゅうせいぐん", "サイコキネシス", "なみのり", "トリック"]
  },
  {
    "id": "staraptor_choice_band",
    "pokemon_id": "398",
    "nature": "ようき",
    "item": "こだわりハチマキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ブレイブバード", "インファイト", "すてみタックル", "とんぼがえり"]
  },
  {
    "id": "gastrodon_wall",
    "pokemon_id": "423",
    "nature": "なまいき",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["ねっとう", "だいちのちから", "どくどく", "じこさいせい"]
  },
  {
    "id": "ambipom_lead",
    "pokemon_id": "424",
    "nature": "ようき",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ねこだまし", "ダブルアタック", "はたきおとす", "とんぼがえり"]
  },
  {
    "id": "purugly_disruptor",
    "pokemon_id": "432",
    "nature": "ようき",
    "item": "シルクのスカーフ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ねこだまし", "すてみタックル", "はたきおとす", "とんぼがえり"]
  },
  {
    "id": "bronzong_wall",
    "pokemon_id": "437",
    "nature": "なまいき",
    "item": "オボンのみ",
    "evs": { "hp": 252, "attack": 0, "defense": 128, "sp_attack": 0, "sp_defense": 128, "speed": 0 },
    "moves": ["ジャイロボール", "じしん", "ステルスロック", "トリックルーム"]
  },
  {
    "id": "garchomp_scarf",
    "pokemon_id": "445",
    "nature": "ようき",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["げきりん", "じしん", "ストーンエッジ", "ほのおのキバ"]
  },
  {
    "id": "lucario_swords_dance",
    "pokemon_id": "448",
    "nature": "ようき",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["インファイト", "コメットパンチ", "しんそく", "つるぎのまい"]
  },
  {
    "id": "hippowdon_physical_wall",
    "pokemon_id": "450",
    "nature": "わんぱく",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["じしん", "ステルスロック", "あくび", "なまける"]
  },
  {
    "id": "toxicroak_setup",
    "pokemon_id": "454",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ダストシュート", "ドレインパンチ", "ふいうち", "つるぎのまい"]
  },
  {
    "id": "abomasnow_mixed",
    "pokemon_id": "460",
    "nature": "れいせい",
    "item": "きあいのタスキ",
    "evs": { "hp": 252, "attack": 4, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 0 },
    "moves": ["ふぶき", "ウッドハンマー", "こおりのつぶて", "じしん"]
  },
  {
    "id": "weavile_sweeper",
    "pokemon_id": "461",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["トリプルアクセル", "はたきおとす", "こおりのつぶて", "つるぎのまい"]
  },
  {
    "id": "togekiss_nasty_plot",
    "pokemon_id": "468",
    "nature": "おくびょう",
    "item": "ラムのみ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["エアスラッシュ", "マジカルシャイン", "かえんほうしゃ", "わるだくみ"]
  },
  {
    "id": "gliscor_toxic_orb",
    "pokemon_id": "472",
    "nature": "ようき",
    "item": "どくどくだま",
    "evs": { "hp": 228, "attack": 4, "defense": 4, "sp_attack": 0, "sp_defense": 20, "speed": 252 },
    "moves": ["じしん", "ハサミギロチン", "みがわり", "まもる"]
  },
  {
    "id": "mamoswine_focus_sash",
    "pokemon_id": "473",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["じしん", "つららおとし", "こおりのつぶて", "ステルスロック"]
  },
  {
    "id": "porygon_z_adaptability",
    "pokemon_id": "474",
    "nature": "ひかえめ",
    "item": "シルクのスカーフ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["トライアタック", "あくのはどう", "れいとうビーム", "わるだくみ"]
  },
  {
    "id": "gallade_swords_dance",
    "pokemon_id": "475",
    "nature": "ようき",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["インファイト", "サイコカッター", "はたきおとす", "かげうち"]
  },
  {
    "id": "froslass_spikes",
    "pokemon_id": "478",
    "nature": "おくびょう",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["れいとうビーム", "たたりめ", "まきびし", "みちづれ"]
  },
  {
    "id": "rotom_choice_scarf",
    "pokemon_id": "479",
    "nature": "おくびょう",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["ボルトチェンジ", "シャドーボール", "10まんボルト", "トリック"]
  },
  {
    "id": "heatran_special_wall",
    "pokemon_id": "485",
    "nature": "おだやか",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["マグマストーム", "だいちのちから", "どくどく", "まもる"]
  },
  {
    "id": "cresselia_wall",
    "pokemon_id": "488",
    "nature": "ずぶとい",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["サイコキネシス", "れいとうビーム", "つきのひかり", "みかづきのまい"]
  },
{
    "id": "gigalith_tank",
    "pokemon_id": "526",
    "nature": "いじっぱり",
    "item": "オボンのみ",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["ストーンエッジ", "じしん", "ステルスロック", "だいばくはつ"]
  },
  {
    "id": "excadrill_focus_sash",
    "pokemon_id": "530",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["じしん", "アイアンヘッド", "いわなだれ", "つるぎのまい"]
  },
  {
    "id": "scolipede_life_orb",
    "pokemon_id": "545",
    "nature": "ようき",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["メガホーン", "どくづき", "じしん", "まもる"]
  },
  {
    "id": "whimsicott_subseed",
    "pokemon_id": "547",
    "nature": "おくびょう",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ムーンフォース", "やどりぎのタネ", "みがわり", "アンコール"]
  },
  {
    "id": "darmanitan_scarf",
    "pokemon_id": "555",
    "nature": "ようき",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["フレアドライブ", "いわなだれ", "ばかぢから", "とんぼがえり"]
  },
  {
    "id": "scrafty_dragon_dance",
    "pokemon_id": "560",
    "nature": "ようき",
    "item": "ラムのみ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["はたきおとす", "ドレインパンチ", "れいとうパンチ", "りゅうのまい"]
  },
  {
    "id": "cofagrigus_wall",
    "pokemon_id": "563",
    "nature": "ずぶとい",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["シャドーボール", "おにび", "いたみわけ", "トリックルーム"]
  },
  {
    "id": "gothitelle_trick",
    "pokemon_id": "576",
    "nature": "おだやか",
    "item": "こだわりスカーフ",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["サイコキネシス", "トリック", "めいそう", "ねむる"]
  },
  {
    "id": "reuniclus_trick_room",
    "pokemon_id": "579",
    "nature": "れいせい",
    "item": "いのちのたま",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 252, "sp_defense": 0, "speed": 0 },
    "moves": ["サイコキネシス", "きあいだま", "シャドーボール", "トリックルーム"]
  },
  {
    "id": "amoonguss_wall",
    "pokemon_id": "591",
    "nature": "ずぶとい",
    "item": "くろいヘドロ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ギガドレイン", "クリアスモッグ", "キノコのほうし", "イカサマ"]
  },
  {
    "id": "ferrothorn_hazard",
    "pokemon_id": "598",
    "nature": "のんき",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ジャイロボール", "パワーウィップ", "やどりぎのタネ", "ステルスロック"]
  },
  {
    "id": "chandelure_scarf",
    "pokemon_id": "609",
    "nature": "おくびょう",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["シャドーボール", "かえんほうしゃ", "エナジーボール", "トリック"]
  },
  {
    "id": "mienshao_life_orb",
    "pokemon_id": "620",
    "nature": "ようき",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["とびひざげり", "はたきおとす", "ねこだまし", "とんぼがえり"]
  },
  {
    "id": "bisharp_swords_dance",
    "pokemon_id": "625",
    "nature": "いじっぱり",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["はたきおとす", "アイアンヘッド", "ふいうち", "つるぎのまい"]
  },
  {
    "id": "hydreigon_specs",
    "pokemon_id": "635",
    "nature": "おくびょう",
    "item": "こだわりメガネ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["あくのはどう", "りゅうせいぐん", "かえんほうしゃ", "とんぼがえり"]
  },
  {
    "id": "volcarona_quiver_dance",
    "pokemon_id": "637",
    "nature": "おくびょう",
    "item": "ラムのみ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["ほのおのまい", "むしのさざめき", "ギガドレイン", "ちょうのまい"]
  },
  {
    "id": "terrakion_focus_sash",
    "pokemon_id": "639",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["インファイト", "ストーンエッジ", "じしん", "つるぎのまい"]
  },
  {
    "id": "tornadus_life_orb",
    "pokemon_id": "641",
    "nature": "おくびょう",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["ぼうふう", "きあいだま", "ねっぷう", "とんぼがえり"]
  },
  {
    "id": "landorus_scarf",
    "pokemon_id": "645",
    "nature": "ようき",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["じしん", "ストーンエッジ", "とんぼがえり", "ばかぢから"]
  },
  {
    "id": "greninja_life_orb",
    "pokemon_id": "658",
    "nature": "おくびょう",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["なみのり", "あくのはどう", "れいとうビーム", "みずしゅりけん"]
  },
  {
    "id": "diggersby_choice_band",
    "pokemon_id": "660",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["じしん", "おんがえし", "でんこうせっか", "ほのおのパンチ"]
  },
  {
    "id": "talonflame_band",
    "pokemon_id": "663",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["ブレイブバード", "フレアドライブ", "とんぼがえり", "はがねのつばさ"]
  },
  {
    "id": "florges_cleric",
    "pokemon_id": "671",
    "nature": "おだやか",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ムーンフォース", "ねがいごと", "まもる", "アロマセラピー"]
  },
  {
    "id": "doublade_eviolite",
    "pokemon_id": "680",
    "nature": "ゆうかん",
    "item": "しんかのきせき",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["アイアンヘッド", "シャドークロー", "かげうち", "つるぎのまい"]
  },
  {
    "id": "aegislash_weakness_policy",
    "pokemon_id": "681",
    "nature": "れいせい",
    "item": "じゃくてんほけん",
    "evs": { "hp": 252, "attack": 4, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 0 },
    "moves": ["シャドーボール", "ラスターカノン", "かげうち", "キングシールド"]
  },
  {
    "id": "malamar_assault_vest",
    "pokemon_id": "687",
    "nature": "いじっぱり",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ばかぢから", "はたきおとす", "サイコカッター", "いわなだれ"]
  },
  {
    "id": "barbaracle_shell_smash",
    "pokemon_id": "689",
    "nature": "いじっぱり",
    "item": "しろいハーブ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["シェルブレード", "ストーンエッジ", "じしん", "からをやぶる"]
  },
  {
    "id": "tyrantrum_choice_scarf",
    "pokemon_id": "697",
    "nature": "ようき",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["もろはのずつき", "げきりん", "じしん", "インファイト"]
  },
  {
    "id": "sylveon_choice_specs",
    "pokemon_id": "700",
    "nature": "ひかえめ",
    "item": "こだわりメガネ",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 252, "sp_defense": 0, "speed": 0 },
    "moves": ["ハイパーボイス", "サイコショック", "マジカルフレイム", "シャドーボール"]
  },
  {
    "id": "hawlucha_sitrus",
    "pokemon_id": "701",
    "nature": "いじっぱり",
    "item": "オボンのみ",
    "evs": { "hp": 12, "attack": 244, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["アクロバット", "とびひざげり", "つるぎのまい", "みがわり"]
  },
  {
    "id": "goodra_assault_vest",
    "pokemon_id": "706",
    "nature": "ひかえめ",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 252, "sp_defense": 0, "speed": 0 },
    "moves": ["りゅうせいぐん", "ヘドロウェーブ", "かえんほうしゃ", "10まんボルト"]
  },
  {
    "id": "klefki_screens",
    "pokemon_id": "707",
    "nature": "おだやか",
    "item": "ひかりのねんど",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["リフレクター", "ひかりのかべ", "イカサマ", "でんじは"]
  },
  {
    "id": "trevenant_sitrus",
    "pokemon_id": "709",
    "nature": "しんちょう",
    "item": "オボンのみ",
    "evs": { "hp": 252, "attack": 4, "defense": 0, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["ウッドホーン", "ゴーストダイブ", "おにび", "やどりぎのタネ"]
  },
  {
    "id": "gourgeist_tank",
    "pokemon_id": "711",
    "nature": "わんぱく",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["タネばくだん", "イカサマ", "おにび", "こうごうせい"]
  },
  {
    "id": "avalugg_physical_wall",
    "pokemon_id": "713",
    "nature": "わんぱく",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 4, "defense": 252, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["ゆきなだれ", "ボディプレス", "じこさいせい", "てっぺき"]
  },
  {
    "id": "noivern_choice_specs",
    "pokemon_id": "715",
    "nature": "おくびょう",
    "item": "こだわりメガネ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["りゅうせいぐん", "ぼうふう", "かえんほうしゃ", "とんぼがえり"]
  },
{
    "id": "incineroar_utility",
    "pokemon_id": "727",
    "nature": "しんちょう",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 4, "defense": 0, "sp_attack": 0, "sp_defense": 252, "speed": 0 },
    "moves": ["フレアドライブ", "ＤＤラリアット", "とんぼがえり", "ねこだまし"]
  },
  {
    "id": "toxapex_wall",
    "pokemon_id": "748",
    "nature": "ずぶとい",
    "item": "くろいヘドロ",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ねっとう", "どくどく", "トーチカ", "じこさいせい"]
  },
  {
    "id": "araquanid_band",
    "pokemon_id": "752",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["アクアブレイク", "きゅうけつ", "どくづき", "アクアジェット"]
  },
  {
    "id": "comfey_triage",
    "pokemon_id": "764",
    "nature": "ひかえめ",
    "item": "いのちのたま",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 252, "sp_defense": 0, "speed": 0 },
    "moves": ["ドレインキッス", "ギガドレイン", "めいそう", "こうごうせい"]
  },
  {
    "id": "wimpod_sash",
    "pokemon_id": "767",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["アクアジェット", "むしのていこう", "まきびし", "ちょうはつ"]
  },
  {
    "id": "golisopod_band",
    "pokemon_id": "768",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["であいがしら", "アクアブレイク", "インファイト", "ふいうち"]
  },
  {
    "id": "palossand_wall",
    "pokemon_id": "770",
    "nature": "ずぶとい",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["だいちのちから", "シャドーボール", "すなあつめ", "ステルスロック"]
  },
  {
    "id": "pyukumuku_unaware",
    "pokemon_id": "771",
    "nature": "ずぶとい",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["じこさいせい", "どくどく", "まもる", "みずびたし"]
  },
  {
    "id": "mimikyu_swords_dance",
    "pokemon_id": "778",
    "nature": "ようき",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["じゃれつく", "シャドークロー", "かげうち", "つるぎのまい"]
  },
  {
    "id": "jangmo_o_eviolite",
    "pokemon_id": "782",
    "nature": "いじっぱり",
    "item": "しんかのきせき",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["ドラゴンクロー", "インファイト", "りゅうのまい", "まもる"]
  },
  {
    "id": "tapu_koko_specs",
    "pokemon_id": "785",
    "nature": "おくびょう",
    "item": "こだわりメガネ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["10まんボルト", "マジカルシャイン", "ボルトチェンジ", "くさむすび"]
  },
  {
    "id": "tapu_lele_scarf",
    "pokemon_id": "786",
    "nature": "おくびょう",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["サイコキネシス", "ムーンフォース", "シャドーボール", "きあいだま"]
  },
  {
    "id": "tapu_bulu_band",
    "pokemon_id": "787",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 252, "attack": 252, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 0 },
    "moves": ["ウッドハンマー", "ウッドホーン", "ばかぢから", "ストーンエッジ"]
  },
  {
    "id": "tapu_fini_calm_mind",
    "pokemon_id": "788",
    "nature": "ずぶとい",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["なみのり", "ムーンフォース", "めいそう", "ちょうはつ"]
  },
  {
    "id": "nihilego_meteor_beam",
    "pokemon_id": "793",
    "nature": "おくびょう",
    "item": "パワフルハーブ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["メテオビーム", "ヘドロウェーブ", "パワージェム", "くさむすび"]
  },
  {
    "id": "celesteela_leech_seed",
    "pokemon_id": "797",
    "nature": "のんき",
    "item": "たべのこし",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 4, "sp_defense": 0, "speed": 0 },
    "moves": ["ヘビーボンバー", "かえんほうしゃ", "やどりぎのタネ", "まもる"]
  },
  {
    "id": "kartana_scarf",
    "pokemon_id": "798",
    "nature": "ようき",
    "item": "こだわりスカーフ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["リーフブレード", "スマートホーン", "せいなるつるぎ", "はたきおとす"]
  },
  {
    "id": "stakataka_trick_room",
    "pokemon_id": "805",
    "nature": "さみしがり",
    "item": "シュカのみ",
    "evs": { "hp": 252, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ジャイロボール", "ロックブラスト", "じしん", "トリックルーム"]
  },
  {
    "id": "rillaboom_band",
    "pokemon_id": "812",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["グラススライダー", "ウッドハンマー", "はたきおとす", "とんぼがえり"]
  },
  {
    "id": "cinderace_life_orb",
    "pokemon_id": "815",
    "nature": "ようき",
    "item": "いのちのたま",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["かえんボール", "とびひざげり", "ダストシュート", "とんぼがえり"]
  },
  {
    "id": "corviknight_wall",
    "pokemon_id": "823",
    "nature": "わんぱく",
    "item": "ゴツゴツメット",
    "evs": { "hp": 252, "attack": 0, "defense": 252, "sp_attack": 0, "sp_defense": 4, "speed": 0 },
    "moves": ["ブレイブバード", "ボディプレス", "てっぺき", "はねやすめ"]
  },
  {
    "id": "toxtricity_specs",
    "pokemon_id": "849",
    "nature": "ひかえめ",
    "item": "こだわりメガネ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["オーバードライブ", "ヘドロウェーブ", "ばくおんぱ", "ボルトチェンジ"]
  },
  {
    "id": "polteageist_shell_smash",
    "pokemon_id": "855",
    "nature": "ひかえめ",
    "item": "しろいハーブ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["シャドーボール", "アシストパワー", "ギガドレイン", "からをやぶる"]
  },
  {
    "id": "cursola_sash",
    "pokemon_id": "864",
    "nature": "ひかえめ",
    "item": "きあいのタスキ",
    "evs": { "hp": 252, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 4, "speed": 0 },
    "moves": ["シャドーボール", "だいちのちから", "パワージェム", "ステルスロック"]
  },
  {
    "id": "mr_rime_utility",
    "pokemon_id": "866",
    "nature": "おくびょう",
    "item": "あつぞこブーツ",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["れいとうビーム", "サイコキネシス", "こうそくスピン", "フリーズドライ"]
  },
  {
    "id": "frosmoth_quiver_dance",
    "pokemon_id": "873",
    "nature": "おくびょう",
    "item": "あつぞこブーツ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["れいとうビーム", "むしのさざめき", "ギガドレイン", "ちょうのまい"]
  },
  {
    "id": "indeedee_specs",
    "pokemon_id": "876",
    "nature": "ひかえめ",
    "item": "こだわりメガネ",
    "evs": { "hp": 252, "attack": 0, "defense": 4, "sp_attack": 252, "sp_defense": 0, "speed": 0 },
    "moves": ["サイコキネシス", "ハイパーボイス", "マジカルシャイン", "マジカルフレイム"]
  },
  {
    "id": "morpeko_sash",
    "pokemon_id": "877",
    "nature": "ようき",
    "item": "きあいのタスキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["オーラぐるま", "タネマシンガン", "いかりのまえば", "まもる"]
  },
  {
    "id": "dracovish_band",
    "pokemon_id": "882",
    "nature": "いじっぱり",
    "item": "こだわりハチマキ",
    "evs": { "hp": 4, "attack": 252, "defense": 0, "sp_attack": 0, "sp_defense": 0, "speed": 252 },
    "moves": ["エラがみ", "げきりん", "じしん", "サイコファング"]
  },
  {
    "id": "duraludon_assault_vest",
    "pokemon_id": "884",
    "nature": "ひかえめ",
    "item": "とつげきチョッキ",
    "evs": { "hp": 252, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 4, "speed": 0 },
    "moves": ["りゅうせいぐん", "ラスターカノン", "10まんボルト", "あくのはどう"]
  },
  {
    "id": "dragapult_specs",
    "pokemon_id": "887",
    "nature": "おくびょう",
    "item": "こだわりメガネ",
    "evs": { "hp": 4, "attack": 0, "defense": 0, "sp_attack": 252, "sp_defense": 0, "speed": 252 },
    "moves": ["シャドーボール", "りゅうせいぐん", "だいもんじ", "10まんボルト"]
  }
]