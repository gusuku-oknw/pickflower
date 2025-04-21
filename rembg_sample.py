from rembg import remove
from PIL import Image

def remove_background_and_show(input_path, output_path=None):
    # 1) 画像を読み込み（RGBA モードに変換）
    input_image = Image.open(input_path).convert("RGBA")
    # 2) rembg.remove() で背景除去
    output_image = remove(input_image)  # remove() は PIL.Image.Image を受け取る :contentReference[oaicite:2]{index=2}
    # 3) 結果を保存（必要なら）
    if output_path:
        output_image.save(output_path)
    # 4) 結果を表示
    output_image.show()  # Pillow の show() で既定のビューアを起動 :contentReference[oaicite:3]{index=3}

if __name__ == "__main__":
    # 実行例
    remove_background_and_show(
        input_path="img/99828_0_720.jpg",
        output_path=None
    )
