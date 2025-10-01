import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { z } from 'zod';

import { app } from '@/config';
import { createOpengraphImage } from '@/lib/server';

// export const runtime = 'edge'
// export const revalidate = 60 * 60 * 24

// パラメータのスキーマ定義
const zodSchema = z.object({
  title: z.string().trim().min(1).default(app.name),
});

type OgpParams = z.infer<typeof zodSchema>;

/**
 * URLパラメータを安全にパースする
 */
function parseUrlParams(searchParams: URLSearchParams): OgpParams {
  const params = Object.fromEntries(searchParams.entries());
  const result = zodSchema.safeParse(params);

  if (!result.success) {
    console.warn('OGP Parameter validation failed:', {
      errors: result.error.issues,
      receivedParams: params,
    });
    // バリデーション失敗時はデフォルト値を使用
    return zodSchema.parse({});
  }

  return result.data;
}

/**
 * キャッシュヘッダーを設定する
 */
function setCacheHeaders(response: ImageResponse): void {
  const cacheHeaders = {
    'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    'CDN-Cache-Control': 'public, max-age=86400',
    'Vercel-CDN-Cache-Control': 'public, max-age=86400',
  };

  Object.entries(cacheHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

/**
 * デバッグヘッダーを設定する（開発環境のみ）
 */
function setDebugHeaders(response: ImageResponse, params: OgpParams): void {
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-OGP-Params', encodeURIComponent(JSON.stringify(params)));
    response.headers.set('X-Generated-At', new Date().toISOString());
  }
}

/**
 * フォールバック用のOGP画像を生成する
 */
async function generateFallbackImage(): Promise<ImageResponse> {
  try {
    const { image } = createOpengraphImage(app.name);
    return await image();
  } catch (error) {
    console.error('Fallback image generation failed:', error);
    // 最終的なフォールバックとして空の画像レスポンスを返す
    throw new Error('Failed to generate fallback OGP image');
  }
}

export async function GET(req: NextRequest): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const params = parseUrlParams(searchParams);
    console.log({ title: params.title, src: 'route' });

    // OGP画像を生成
    const { image } = createOpengraphImage(params.title);

    const response = await image();

    // ヘッダーを設定
    setCacheHeaders(response);
    setDebugHeaders(response, params);

    return response;
  } catch (error) {
    console.error('OGP Image generation failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    // フォールバック画像を返す
    try {
      const fallbackResponse = await generateFallbackImage();
      setCacheHeaders(fallbackResponse);

      // エラー情報をヘッダーに追加（開発環境のみ）
      if (process.env.NODE_ENV === 'development') {
        fallbackResponse.headers.set('X-Fallback-Reason', 'Primary generation failed');
      }

      return fallbackResponse;
    } catch (fallbackError) {
      console.error('Fallback image generation also failed:', fallbackError);

      // 最終的なエラーハンドリング
      // この場合は500エラーをスローして、Next.jsのデフォルトエラーハンドリングに委ねる
      throw new Error('Complete OGP image generation failure');
    }
  }
}
