# comment_service.py
import openai
import os
from dotenv import load_dotenv

load_dotenv()

# OpenAI APIキー設定
openai.api_key = os.getenv("OPENAI_API_KEY")

async def generate_image_comment(image_bytes: bytes) -> str:
    """
    画像バイトからコメントを生成する関数
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": (
                "You are an AI assistant that looks at the provided image "
                "and writes a friendly, engaging comment about it."
            )},
            {"role": "user", "content": {"image_data": image_bytes}},
        ],
    )
    return response.choices[0].message["content"].strip()
