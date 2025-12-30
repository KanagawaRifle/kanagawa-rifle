import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

/**
 * OGP 画像のテーマ
 */
export type OgpTheme = "default" | "cern" | "win95" | "modern" | "terminal" | "glass";

/**
 * OGP 画像生成のオプション
 */
export interface CreateOpengraphImageOptions {
  /** ページタイトル */
  title: string;
  /** サブタイトル（オプション） */
  subtitle?: string;
  /** テーマ（デフォルト: "default"） */
  theme?: OgpTheme;
  /** 画像の幅（デフォルト: 1200） */
  width?: number;
  /** 画像の高さ（デフォルト: 630） */
  height?: number;
}

/**
 * テーマごとのスタイル設定
 */
const themeStyles: Record<
  OgpTheme,
  {
    background: string;
    titleColor: string;
    subtitleColor: string;
    accentColor: string;
    fontFamily: string;
  }
> = {
  // 2000年代レトロ風（トップページ）
  default: {
    background: "linear-gradient(135deg, #1a0033 0%, #330066 50%, #4a0080 100%)",
    titleColor: "#ffff00",
    subtitleColor: "#00ffff",
    accentColor: "#ff00ff",
    fontFamily: "sans-serif",
  },
  // 1990年代 CERN 風（About ページ）
  cern: {
    background: "#c0c0c0",
    titleColor: "#000080",
    subtitleColor: "#000000",
    accentColor: "#0000ff",
    fontFamily: "serif",
  },
  // Windows 95 風（競技会ページ）
  win95: {
    background: "#008080",
    titleColor: "#ffffff",
    subtitleColor: "#c0c0c0",
    accentColor: "#000080",
    fontFamily: "sans-serif",
  },
  // モダン風（射撃場ページ）
  modern: {
    background: "linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)",
    titleColor: "#ffffff",
    subtitleColor: "#d1fae5",
    accentColor: "#34d399",
    fontFamily: "sans-serif",
  },
  // Linux ターミナル風（Projects ページ）
  terminal: {
    background: "#0d0d0d",
    titleColor: "#00ff00",
    subtitleColor: "#33ff33",
    accentColor: "#00ff00",
    fontFamily: "monospace",
  },
  // iOS 9 + Liquid Glass 風（Links ページ）
  glass: {
    background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 30%, #80deea 60%, #ffcc80 100%)",
    titleColor: "#334155",
    subtitleColor: "#475569",
    accentColor: "#0891b2",
    fontFamily: "sans-serif",
  },
};

/**
 * OGP 画像を生成する
 *
 * @example
 * ```ts
 * // API ルートで使用
 * import { createOpengraphImage } from "@/lib/server/opengraph";
 *
 * export async function GET(request: Request) {
 *   const { searchParams } = new URL(request.url);
 *   const title = searchParams.get("title") || "横須賀市ライフル射撃協会";
 *
 *   return createOpengraphImage({
 *     title,
 *     subtitle: "神奈川県の射撃団体",
 *     theme: "default",
 *   });
 * }
 * ```
 */
export function createOpengraphImage(
  options: CreateOpengraphImageOptions
): ImageResponse {
  const {
    title,
    subtitle,
    theme = "default",
    width = 1200,
    height = 630,
  } = options;

  const styles = themeStyles[theme];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: styles.background,
          fontFamily: styles.fontFamily,
          position: "relative",
        }}
      >
        {/* 装飾要素 - テーマに応じた装飾 */}
        {theme === "default" && (
          <>
            {/* 星のきらきら */}
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "60px",
                fontSize: "32px",
                color: "#ffff00",
                display: "flex",
              }}
            >
              *
            </div>
            <div
              style={{
                position: "absolute",
                top: "80px",
                right: "100px",
                fontSize: "24px",
                color: "#ff00ff",
                display: "flex",
              }}
            >
              +
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "100px",
                left: "120px",
                fontSize: "28px",
                color: "#00ffff",
                display: "flex",
              }}
            >
              *
            </div>
          </>
        )}

        {theme === "win95" && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "32px",
              background: "linear-gradient(90deg, #000080, #1084d0)",
              display: "flex",
              alignItems: "center",
              paddingLeft: "12px",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {siteConfig.shortName}
          </div>
        )}

        {theme === "terminal" && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "24px",
              color: "#00ff00",
              fontSize: "14px",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            user@yrsa:~$
          </div>
        )}

        {/* メインコンテンツ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 60px",
            maxWidth: "90%",
          }}
        >
          {/* サイト名 */}
          <div
            style={{
              fontSize: "24px",
              color: styles.subtitleColor,
              marginBottom: "16px",
              display: "flex",
            }}
          >
            {siteConfig.name}
          </div>

          {/* タイトル */}
          <div
            style={{
              fontSize: title.length > 20 ? "48px" : "64px",
              fontWeight: "bold",
              color: styles.titleColor,
              textAlign: "center",
              lineHeight: 1.2,
              display: "flex",
              ...(theme === "default"
                ? { textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }
                : {}),
            }}
          >
            {title}
          </div>

          {/* サブタイトル */}
          {subtitle && (
            <div
              style={{
                fontSize: "28px",
                color: styles.subtitleColor,
                marginTop: "20px",
                textAlign: "center",
                display: "flex",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* フッター */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: styles.subtitleColor,
              opacity: 0.8,
              display: "flex",
            }}
          >
            {siteConfig.baseUrl.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}

/**
 * OGP 画像の URL を生成するヘルパー関数
 *
 * @example
 * ```ts
 * // metadata で使用
 * export const metadata: Metadata = {
 *   openGraph: {
 *     images: [getOpengraphImageUrl({ title: "月例会" })],
 *   },
 * };
 * ```
 */
export function getOpengraphImageUrl(
  options: Omit<CreateOpengraphImageOptions, "width" | "height">
): string {
  const params = new URLSearchParams();
  params.set("title", options.title);
  if (options.subtitle) {
    params.set("subtitle", options.subtitle);
  }
  if (options.theme) {
    params.set("theme", options.theme);
  }
  return `/api/ogp?${params.toString()}`;
}
