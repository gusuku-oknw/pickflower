# app.py など -------------------------------
from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os, uuid
from pathlib import Path

app = FastAPI()

origins = ["http://localhost:3000"]          # ← Next.js 開発サーバ
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
# テスト用ダミーデータを 30 件ほど用意
sample_history = [
    {
        "id": i,
        "caption": f"サンプル投稿 {i}",
        "imageUrl": f"https://picsum.photos/300/200?random={i}",
        "date": f"2023-10-{i:02d}",
        "likes": 10 * i,
        "comments": i,
        "saved": i % 2 == 0,
    }
    for i in range(1, 31)
]

@app.get("/api/history", tags=["posts"])
async def get_history(
    offset: int = Query(0, ge=0),
    limit : int = Query(5, ge=1, le=20),
):
    """offset / limit でページング"""
    end = offset + limit
    if offset >= len(sample_history):
        return []          # もうデータなし
    return sample_history[offset:end]

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
