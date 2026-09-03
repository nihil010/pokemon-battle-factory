import requests
import json
import time

# 取得するポケモンの名前リスト（第1〜第8世代の選出160体）
# ※PokeAPIは基本英語名での検索となるため、日本語名から英語名への変換、または図鑑番号での指定が必要です。
# 今回は確実な図鑑番号（ID）を使用します。
pokemon_ids = [
    # 第1世代
    149, 94, 143, 130, 145, 113, 36, 3, 6, 80, 91, 65, 59, 82, 131, 142, 38, 34, 31,
    # 第2世代
    248, 233, 212, 184, 245, 227, 197, 195, 214, 235, 243, 244, 169, 222, 242, 237, 230, 171, 232,
    # 第3世代
    373, 376, 381, 380, 286, 257, 260, 282, 279, 324, 356, 350, 365, 379, 291, 292,
    # 第4世代 (ロトムは基本フォルムの479を使用)
    445, 448, 450, 468, 479, 473, 485, 488, 437, 472, 474, 475, 461, 460, 77, 423, 454, 478, 398, 424,
    # 第5世代 (ランドロス等は基本フォルム)
    645, 641, 598, 637, 635, 530, 547, 609, 591, 620, 625, 563, 579, 545, 555, 560, 576, 526, 639,
    # 第6世代
    681, 658, 663, 700, 707, 660, 701, 706, 715, 432, 689, 687, 680, 697, 709, 711, 713, 671,
    # 第7世代
    778, 785, 786, 788, 787, 727, 797, 793, 798, 748, 752, 768, 770, 764, 767, 771, 782, 805,
    # 第8世代
    887, 815, 812, 823, 876, 884, 849, 882, 855, 877, 866, 864, 873
]
# 重複を排除
pokemon_ids = list(set(pokemon_ids))

# 世代を判定する関数
def get_generation(pokemon_id):
    if pokemon_id <= 151: return 1
    if pokemon_id <= 251: return 2
    if pokemon_id <= 386: return 3
    if pokemon_id <= 493: return 4
    if pokemon_id <= 649: return 5
    if pokemon_id <= 721: return 6
    if pokemon_id <= 809: return 7
    return 8

# 日本語名を取得する関数
def get_japanese_name(species_url):
    response = requests.get(species_url)
    if response.status_code == 200:
        species_data = response.json()
        for name_data in species_data['names']:
            if name_data['language']['name'] == 'ja':
                return name_data['name']
    return "Unknown"

# 日本語タイプ名に変換する辞書
type_translation = {
    "normal": "ノーマル", "fire": "ほのお", "water": "みず", "electric": "でんき",
    "grass": "くさ", "ice": "こおり", "fighting": "かくとう", "poison": "どく",
    "ground": "じめん", "flying": "ひこう", "psychic": "エスパー", "bug": "むし",
    "rock": "いわ", "ghost": "ゴースト", "dragon": "ドラゴン", "dark": "あく",
    "steel": "はがね", "fairy": "フェアリー"
}

def fetch_all_pokemon_data():
    pokemon_dict = {}
    total = len(pokemon_ids)
    
    print(f"取得開始: 全{total}体")
    
    for i, p_id in enumerate(pokemon_ids):
        print(f"[{i+1}/{total}] ID:{p_id} のデータを取得中...")
        
        try:
            # 基本データの取得
            url = f"https://pokeapi.co/api/v2/pokemon/{p_id}"
            res = requests.get(url)
            
            if res.status_code != 200:
                print(f"エラー: ID {p_id} の取得に失敗")
                continue
                
            data = res.json()
            
            # 日本語名の取得
            jp_name = get_japanese_name(data['species']['url'])
            
            # タイプ
            types = [type_translation[t['type']['name']] for t in data['types']]
            
            # 種族値
            stats = {
                "hp": data['stats'][0]['base_stat'],
                "attack": data['stats'][1]['base_stat'],
                "defense": data['stats'][2]['base_stat'],
                "sp_attack": data['stats'][3]['base_stat'],
                "sp_defense": data['stats'][4]['base_stat'],
                "speed": data['stats'][5]['base_stat']
            }
            
            # 動く画像の取得（第5世代ブラックホワイト準拠）
            # なければ通常の静止画をフォールバックとして設定
            sprites = data['sprites']['versions']['generation-v']['black-white']['animated']
            front_img = sprites['front_default'] or data['sprites']['front_default']
            back_img = sprites['back_default'] or data['sprites']['back_default']
            
            pokemon_dict[str(p_id)] = {
                "name": jp_name,
                "generation": get_generation(p_id),
                "types": types,
                "base_stats": stats,
                "sprite_url": front_img,
                "sprite_back_url": back_img
            }
            
            # サーバーに負荷をかけないよう少し待機（APIレート制限対策）
            time.append(0.5)
            
        except Exception as e:
            print(f"ID {p_id} 処理中に例外発生: {e}")

    # JSONファイルとして出力
    with open('pokemon_data.json', 'w', encoding='utf-8') as f:
        json.dump(pokemon_dict, f, ensure_ascii=False, indent=2)
    
    print("\n✅ 出力完了: pokemon_data.json が作成されました！")

if __name__ == "__main__":
    fetch_all_pokemon_data()