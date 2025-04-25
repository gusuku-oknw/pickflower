# app.py など -------------------------------
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from comment_service import generate_image_comment

import os, uuid
from pathlib import Path
from dotenv import load_dotenv
# .env ファイルの読み込み
load_dotenv()

app = FastAPI(debug=True)


fast_server = "http://localhost:8000"  # ← FastAPI 開発サーバの URL
next_server = "http://localhost:3000"  # ← Next.js 開発サーバの URL
origins = [next_server]          # ← Next.js 開発サーバ
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/comments")
async def comment_endpoint(file: UploadFile = File(...)):
    # バリデーション
    if file.content_type not in {"image/jpeg", "image/png"}:
        raise HTTPException(status_code=400, detail="Invalid image type")
    image_bytes = await file.read()

    # コメント生成サービス呼び出し
    try:
        comment = await generate_image_comment(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Service error: {e}")

    return JSONResponse({"comment": comment})

# アップロードディレクトリの定義
upload_dir = "uploads"
os.makedirs(upload_dir, exist_ok=True)

# 画像アップロードエンドポイント
@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    # ファイルの拡張子を取得（.jpg, .pngなど）
    ext = os.path.splitext(file.filename)[1]
    # UUID で一意なファイル名を生成
    filename = f"{uuid.uuid4().hex}{ext.lower()}"
    file_path = Path(upload_dir) / filename

    try:
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ファイル書き込みに失敗しました: {e}")

    # URL 用にパスを変換（スラッシュ形式）
    posix_path = file_path.as_posix()
    url = f"{fast_server}/{posix_path}"
    return {"url": url, "message": "アップロード完了"}

# 削除エンドポイントの実装
@app.delete("/delete")
async def delete_file(path: str = Query(..., description="削除するファイルの URL")):
    base_url = f"{fast_server}/uploads/"
    if not path.startswith(base_url):
        raise HTTPException(status_code=400, detail="無効なファイルパスです")

    # URLからファイル名（相対パス）を取り出す
    relative_path = path.replace(base_url, "")
    file_path = Path(upload_dir) / relative_path

    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"ファイルが存在しません: {file_path}")

    try:
        file_path.unlink()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ファイル削除に失敗しました: {e}")

    return {"message": "削除完了"}

# 静的ファイルの公開設定（開発用）
app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
