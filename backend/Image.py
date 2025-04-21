from PIL import Image
import cv2
import numpy as np

# ===============================
# Step 1: 緑を透過に変換（Pillow使用）
# ===============================
def remove_green_make_transparent(img, green_threshold=(50, 200, 50), tolerance=60):
    img = img.convert("RGBA")
    datas = img.getdata()
    new_data = []

    for item in datas:
        r, g, b, a = item
        if abs(r - green_threshold[0]) < tolerance and abs(g - green_threshold[1]) < tolerance and abs(b - green_threshold[2]) < tolerance:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    return img

# ===============================
# Step 2: 背景にポートレート風ぼかしをかける（OpenCV）
# ===============================
def portrait_blur_background(image_path):
    img = cv2.imread(image_path)
    mask = np.zeros(img.shape[:2], np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    height, width = img.shape[:2]
    rect = (10, 10, width - 20, height - 20)

    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

    foreground = img * mask2[:, :, np.newaxis]
    blurred = cv2.GaussianBlur(img, (7, 7), 0)
    background_mask = 1 - mask2
    background = blurred * background_mask[:, :, np.newaxis]

    final = cv2.add(foreground, background)
    return cv2.cvtColor(final, cv2.COLOR_BGR2RGBA)  # PIL用にRGBA変換

# ===============================
# Step 3: 画像パス
# ===============================
foreground_path = "../img/fore.png"
background_path = "../img/99828_0_720.jpg"

# ===============================
# Step 4: 前景を透過処理
# ===============================
foreground = Image.open(foreground_path)
foreground_transparent = remove_green_make_transparent(foreground)

# ===============================
# Step 5: 背景をポートレート風に処理
# ===============================
blurred_background_np = portrait_blur_background(background_path)
blurred_background_img = Image.fromarray(blurred_background_np).convert("RGBA")

# ===============================
# Step 6: リサイズ & 合成
# ===============================
foreground_resized = foreground_transparent.resize(blurred_background_img.size)
composited = Image.alpha_composite(blurred_background_img, foreground_resized)

# ===============================
# Step 7: 結果の表示 or 保存
# ===============================
composited.show()
# composited.save("merged_portrait_effect.png")
