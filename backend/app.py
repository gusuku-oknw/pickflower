from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from pathlib import Path

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    # タイムスタンプ付きのファイル名を生成
    file_location = os.path.join(upload_dir, f"{int(os.stat(upload_dir).st_ctime)}-{file.filename}")
    try:
        with open(file_location, "wb") as f:
            content = await file.read()
            f.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ファイル書き込みに失敗しました: {e}")

    # Windows のパスのバックスラッシュを、URL 用に修正する
    # pathlib.Path(...).as_posix() を利用する
    posix_path = Path(file_location).as_posix()
    # URL を生成（スラッシュ区切りになるので正しく参照されます）
    url = f"http://localhost:8000/{posix_path}"

    return {"url": url, "message": "アップロード完了"}


app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
