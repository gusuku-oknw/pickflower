from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from pathlib import Path
import uuid

app = FastAPI()

# CORS 設定
origins = [
    "http://localhost:3000",  # Next.js 開発サーバーの URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    url = f"http://localhost:8000/{posix_path}"
    return {"url": url, "message": "アップロード完了"}

# 削除エンドポイントの実装
@app.delete("/delete")
async def delete_file(path: str = Query(..., description="削除するファイルの URL")):
    base_url = "http://localhost:8000/uploads/"
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
