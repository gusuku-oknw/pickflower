// pages/api/generateComment.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const DEFAULT_SYSTEM = [
  'あなたは画像を見てコメントを考えるクリエイティブライターです。',
  '写真の雰囲気や情景を想像し、共感を呼ぶコメントを日本語で200文字以内で書いてください。',
].join('\n')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, dataUrl } = req.body
  if (!dataUrl) {
    return res.status(400).json({ error: '画像が必要です' })
  }

  const systemPrompt = prompt?.trim() || DEFAULT_SYSTEM

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',    // ← 正しいモデル名
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'この画像についてコメントしてください。' },
            { type: 'image_url', image_url: { url: dataUrl } }
          ]
        }
      ]
    })

    const comment = completion.choices?.[0]?.message?.content.trim() || ''
    return res.status(200).json({ comment })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
