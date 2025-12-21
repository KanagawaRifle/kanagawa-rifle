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

function authenticate(header: string | null, validCredential: Credential): AuthResult {
  const credential = parseBasicAuthHeader(header);

  if (!credential) {
    return { user: null, error: 'Invalid authorization header' };
  }

  const isValid = credential.id === validCredential.id && credential.password === validCredential.password;

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
  if (!BASIC_AUTH_CREDENTIALS) {
    console.error('Basic auth credentials not configured for staging environment');
    return new NextResponse('500 Internal Server Error - Auth not configured', { status: 500 });
  }

  const authResult = authenticate(req.headers.get('Authorization'), BASIC_AUTH_CREDENTIALS);

  if (authResult.error) {
    return new NextResponse('401 Unauthorized  (T_T) ', {
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
