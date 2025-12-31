import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Credential = {
  id: string;
  password: string;
};

type AuthResult = { user: Credential; error: null } | { user: null; error: string };

// 認証情報を環境変数から取得（デフォルト値なし）
const BASIC_AUTH_CREDENTIALS: Credential | null =
  process.env.BASIC_AUTH_ID && process.env.BASIC_AUTH_PASSWORD
    ? {
        id: process.env.BASIC_AUTH_ID,
        password: process.env.BASIC_AUTH_PASSWORD,
      }
    : null;

/**
 * タイミング攻撃に対して安全な文字列比較
 * Edge Runtime で利用可能な実装（crypto.subtle.timingSafeEqual は Node.js 専用）
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // 長さが異なる場合でも一定時間かけて比較を行う（タイミング攻撃防止）
    const maxLen = Math.max(a.length, b.length);
    const paddedA = a.padEnd(maxLen, '\0');
    const paddedB = b.padEnd(maxLen, '\0');
    let _dummy = 0;
    for (let i = 0; i < maxLen; i++) {
      _dummy |= paddedA.charCodeAt(i) ^ paddedB.charCodeAt(i);
    }
    return false; // 長さが異なるので常に false
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function authenticate(header: string | null, validCredential: Credential): AuthResult {
  const credential = parseBasicAuthHeader(header);

  if (!credential) {
    return { user: null, error: 'Invalid authorization header' };
  }

  // タイミング攻撃対策: 両方の比較を常に実行
  const idMatch = constantTimeCompare(credential.id, validCredential.id);
  const passwordMatch = constantTimeCompare(credential.password, validCredential.password);
  const isValid = idMatch && passwordMatch;

  return isValid ? { user: credential, error: null } : { user: null, error: 'Invalid credentials' };
}

/**
 * Basic認証ヘッダーから認証情報を抽出
 * @param header - Authorization ヘッダーの値
 * @returns 認証情報、または null
 */
function parseBasicAuthHeader(header: string | null): Credential | null {
  if (!header || !header?.startsWith('Basic ')) {
    return null;
  }

  try {
    const encoded = header.substring(6);
    const decoded = atob(encoded);
    const [id, password] = decoded.split(':', 2);

    // id と password が両方存在することを確認
    if (!id || !password) {
      return null;
    }

    return { id, password };
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  if (process.env.VERCEL_GIT_COMMIT_REF !== 'staging') {
    return NextResponse.next();
  }

  // 認証情報が設定されていない場合はエラー
  // Note: Edge Runtime では logger が使用不可のため、エラーレスポンスで対応
  if (!BASIC_AUTH_CREDENTIALS) {
    return new NextResponse('500 Internal Server Error - Auth not configured', { status: 500 });
  }

  const authResult = authenticate(req.headers.get('Authorization'), BASIC_AUTH_CREDENTIALS);

  if (authResult.error) {
    return new NextResponse('401 Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// 認証を適用するパスを指定
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
