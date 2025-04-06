import cv2
import numpy as np

# 入力画像の読み込み
img = cv2.imread('img/99828_0_720.jpg')

# セグメンテーション用に背景除去（grabCutを使用）
mask = np.zeros(img.shape[:2], np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

# おおよその前景領域を矩形で指定（画像サイズに応じて調整）
height, width = img.shape[:2]
rect = (10, 10, width - 20, height - 20)

# grabCutで前景と背景を分離
cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

# 前景画像（オブジェクト）
foreground = img * mask2[:, :, np.newaxis]

# 背景画像（ブラー適用）
blurred = cv2.GaussianBlur(img, (25, 25), 0)

# 背景マスクを反転
background_mask = 1 - mask2
background = blurred * background_mask[:, :, np.newaxis]

# 合成
final = cv2.add(foreground, background)

# 結果を保存
cv2.imwrite('portrait_output.jpg', final)

# 表示（任意）
cv2.imshow('Portrait Effect', final)
cv2.waitKey(0)
cv2.destroyAllWindows()
