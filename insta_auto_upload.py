from instagrapi import Client

# ここに自分のInstagramのユーザー名とパスワードを入力
USERNAME = "tmkjny@gmail.com"
PASSWORD = "TW8Wc8Stb_3rMih"

# 投稿する画像のパスとキャプションを設定
IMAGE_PATH = "C:/Users/tmkjn/Downloads/test.png"  # ローカルに保存している画像ファイルのパス
CAPTION = "これはinstagrapiを使った自動投稿サンプルです。 #python #instagrapi"


def main():
    # クライアントインスタンスを作成
    cl = Client()

    # ログイン
    cl.login(USERNAME, PASSWORD)

    # 画像投稿
    media = cl.photo_upload(IMAGE_PATH, CAPTION)
    print("投稿完了:", media)


if __name__ == "__main__":
    main()
