import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a list of blog post ideas.
 */
export const generatePostIdeas = async (): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "あなたは「わびさびトレード塾」という、ノイズを排してチャートの本質と向き合うミニマルな手法を教えるトレーディング塾の講師、クリプトモネダスです。受講生や見込み客に向けたブログ記事のタイトル案を5つ提案してください。思考法、心理学、独自理論、市場分析など、魅力的な切り口でお願いします。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "ブログ記事のタイトル案"
              }
            }
          }
        },
      },
    });
    
    const jsonStr = response.text.trim();
    const parsed = JSON.parse(jsonStr);
    return parsed.ideas || [];

  } catch (error) {
    console.error("Error generating post ideas:", error);
    return [];
  }
};

/**
 * Generates a full blog post from a title.
 */
export const generateFullPost = async (title: string): Promise<Partial<any> | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `あなたは「わびさびトレード塾」の講師、クリプトモネダスです。以下のタイトルでブログ記事を執筆してください。
      
      タイトル: "${title}"

      以下のルールに従って、JSON形式で出力してください。
      - 読者は個人トレーダーです。専門用語は避け、本質的で、示唆に富む内容にしてください。
      - 「わびさびトレード」の哲学（ミニマリズム、静寂、本質主義）を文章のトーンに反映させてください。
      - 本文(content)は、読者が読みやすいように、適度に改行(\n\n)を入れてください。最低でも500文字以上で執筆してください。
      - excerptは、記事一覧で表示される100文字程度の魅力的な要約です。
      - tagsは、記事の内容を表すキーワードを3〜4個選んでください。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "excerpt", "content", "tags"],
        },
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating full post:", error);
    return null;
  }
};


/**
 * Formats a given text with Markdown using AI.
 */
export const formatTextWithMarkdown = async (text: string): Promise<string> => {
  if (!text || text.trim() === '') {
    return text;
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `以下のテキストを、ブログ記事として読みやすくなるようにMarkdown形式で整形してください。適切な箇所に、見出し(##)、太字(**text**)、イタリック(*text*)、箇条書き(- item)などを使用してください。元の文章の内容やニュアンスは変更せず、構造化と装飾のみを行ってください。整形後のMarkdownテキストのみを返してください。

---
${text}
---`,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error formatting text with Markdown:", error);
    // Return original text if formatting fails
    return text;
  }
};
