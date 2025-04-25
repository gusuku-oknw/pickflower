// pages/api/generateComment.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl } = req.body  // クライアントから送られてくる画像URL

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' })
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',  // あるいは 'gpt-4' など
      messages: [
        {
          role: 'system',
          content: [
            'あなたは画像を見て魅力的なコメントを考えるクリエイティブライターです。',
            '写真の雰囲気や情景を想像し、共感を呼ぶコメントを日本語で200文字以内で書いてください。'
          ].join('\n')
        },
        {
          role: 'user',
          content: `こちらの画像についてコメントをお願いします:\n${imageUrl}`
        }
      ]
    })

    const comment = completion.data.choices[0].message?.content?.trim()
    return res.status(200).json({ comment })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}
