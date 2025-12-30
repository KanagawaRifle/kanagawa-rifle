import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

/**
 * OGP 画像のテーマ
 */
export type OgpTheme =
  | "default"
  | "cern"
  | "win95"
  | "modern"
  | "terminal"
  | "glass";

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
 * OGP 画像を生成する
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

  const titleFontSize = title.length > 20 ? 52 : title.length > 12 ? 64 : 72;

  return new ImageResponse(renderTheme(theme, title, subtitle, titleFontSize), {
    width,
    height,
  });
}

/**
 * テーマ別のレンダリング
 */
function renderTheme(
  theme: OgpTheme,
  title: string,
  subtitle: string | undefined,
  titleFontSize: number
): React.ReactElement {
  switch (theme) {
    case "cern":
      return renderCernTheme(title, subtitle, titleFontSize);
    case "win95":
      return renderWin95Theme(title, subtitle, titleFontSize);
    case "modern":
      return renderModernTheme(title, subtitle, titleFontSize);
    case "terminal":
      return renderTerminalTheme(title, subtitle, titleFontSize);
    case "glass":
      return renderGlassTheme(title, subtitle, titleFontSize);
    default:
      return renderDefaultTheme(title, subtitle, titleFontSize);
  }
}

/**
 * 2000年代レトロ風テーマ（トップページ）
 * - ネオングロー効果
 * - グラデーション背景
 * - きらきら装飾
 */
function renderDefaultTheme(
  title: string,
  subtitle: string | undefined,
  titleFontSize: number
): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f0028 0%, #1a0040 25%, #2d1b69 50%, #1a0040 75%, #0f0028 100%)",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景のグリッド効果 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          display: "flex",
        }}
      />

      {/* グロー効果の円 */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,0,255,0.15) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,255,0.12) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* きらきら装飾 */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "80px",
          fontSize: "28px",
          color: "#ffd700",
          display: "flex",
          textShadow: "0 0 10px #ffd700, 0 0 20px #ffd700",
        }}
      >
        ✦
      </div>
      <div
        style={{
          position: "absolute",
          top: "120px",
          right: "120px",
          fontSize: "20px",
          color: "#ff69b4",
          display: "flex",
          textShadow: "0 0 8px #ff69b4",
        }}
      >
        ✧
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "140px",
          left: "150px",
          fontSize: "24px",
          color: "#00ffff",
          display: "flex",
          textShadow: "0 0 10px #00ffff",
        }}
      >
        ✦
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          right: "200px",
          fontSize: "16px",
          color: "#ff00ff",
          display: "flex",
          textShadow: "0 0 6px #ff00ff",
        }}
      >
        ✧
      </div>

      {/* メインコンテンツ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px",
          maxWidth: "90%",
          position: "relative",
        }}
      >
        {/* サイト名 */}
        <div
          style={{
            fontSize: "22px",
            color: "#e0b0ff",
            marginBottom: "20px",
            letterSpacing: "0.2em",
            display: "flex",
          }}
        >
          {siteConfig.name}
        </div>

        {/* タイトル */}
        <div
          style={{
            fontSize: `${titleFontSize}px`,
            fontWeight: "bold",
            background: "linear-gradient(180deg, #ffff00 0%, #ffd700 50%, #ffaa00 100%)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1.2,
            display: "flex",
            textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
          }}
        >
          {title}
        </div>

        {/* サブタイトル */}
        {subtitle && (
          <div
            style={{
              fontSize: "26px",
              color: "#00ffff",
              marginTop: "24px",
              textAlign: "center",
              display: "flex",
              textShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
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
          bottom: "28px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            color: "rgba(224, 176, 255, 0.7)",
            letterSpacing: "0.1em",
            display: "flex",
          }}
        >
          {siteConfig.baseUrl.replace("https://", "")}
        </div>
      </div>
    </div>
  );
}

/**
 * 1990年代 CERN 風テーマ（About ページ）
 * - クラシックな Web 1.0 スタイル
 * - セリフフォント
 * - シンプルなボーダー
 */
function renderCernTheme(
  title: string,
  subtitle: string | undefined,
  titleFontSize: number
): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#d4d4d4",
        fontFamily: "serif",
        position: "relative",
      }}
    >
      {/* ヘッダーライン */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          right: "60px",
          height: "3px",
          background: "#000080",
          display: "flex",
        }}
      />

      {/* メインコンテンツエリア */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          maxWidth: "85%",
          background: "#e8e8e8",
          border: "2px solid #808080",
          boxShadow: "4px 4px 0px #606060",
        }}
      >
        {/* サイト名 */}
        <div
          style={{
            fontSize: "20px",
            color: "#404040",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          {siteConfig.name}
        </div>

        {/* タイトル */}
        <div
          style={{
            fontSize: `${titleFontSize}px`,
            fontWeight: "bold",
            color: "#000080",
            textAlign: "center",
            lineHeight: 1.3,
            display: "flex",
            borderBottom: "2px solid #000080",
            paddingBottom: "16px",
          }}
        >
          {title}
        </div>

        {/* サブタイトル */}
        {subtitle && (
          <div
            style={{
              fontSize: "24px",
              color: "#404040",
              marginTop: "20px",
              textAlign: "center",
              display: "flex",
              fontStyle: "italic",
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
          bottom: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            color: "#0000cc",
            textDecoration: "underline",
            display: "flex",
          }}
        >
          {siteConfig.baseUrl.replace("https://", "")}
        </div>
      </div>

      {/* フッターライン */}
      <div
        style={{
          position: "absolute",
          bottom: "70px",
          left: "60px",
          right: "60px",
          height: "1px",
          background: "#808080",
          display: "flex",
        }}
      />
    </div>
  );
}

/**
 * Windows 95 風テーマ（競技会ページ）
 * - 3D ボーダー効果
 * - クラシックなタイトルバー
 * - システムフォント風
 */
function renderWin95Theme(
  title: string,
  subtitle: string | undefined,
  titleFontSize: number
): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#008080",
        fontFamily: "sans-serif",
        padding: "40px",
      }}
    >
      {/* ウィンドウ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          maxWidth: "1000px",
          background: "#c0c0c0",
          border: "2px solid #ffffff",
          borderRightColor: "#404040",
          borderBottomColor: "#404040",
          boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
        }}
      >
        {/* タイトルバー */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "36px",
            background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
            padding: "0 8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                display: "flex",
              }}
            >
              🎯
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#ffffff",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              {siteConfig.shortName} - 競技会情報
            </div>
          </div>
          {/* ウィンドウボタン */}
          <div
            style={{
              display: "flex",
              gap: "2px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#c0c0c0",
                border: "1px solid #ffffff",
                borderRightColor: "#404040",
                borderBottomColor: "#404040",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              _
            </div>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#c0c0c0",
                border: "1px solid #ffffff",
                borderRightColor: "#404040",
                borderBottomColor: "#404040",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              □
            </div>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#c0c0c0",
                border: "1px solid #ffffff",
                borderRightColor: "#404040",
                borderBottomColor: "#404040",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              ×
            </div>
          </div>
        </div>

        {/* コンテンツエリア */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px 40px",
            background: "#ffffff",
            margin: "4px",
            border: "2px solid #808080",
            borderRightColor: "#ffffff",
            borderBottomColor: "#ffffff",
            minHeight: "400px",
          }}
        >
          {/* アイコン */}
          <div
            style={{
              fontSize: "48px",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            📊
          </div>

          {/* タイトル */}
          <div
            style={{
              fontSize: `${Math.min(titleFontSize, 56)}px`,
              fontWeight: "bold",
              color: "#000080",
              textAlign: "center",
              lineHeight: 1.2,
              display: "flex",
            }}
          >
            {title}
          </div>

          {/* サブタイトル */}
          {subtitle && (
            <div
              style={{
                fontSize: "24px",
                color: "#404040",
                marginTop: "16px",
                textAlign: "center",
                display: "flex",
              }}
            >
              {subtitle}
            </div>
          )}

          {/* 装飾ボタン */}
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              padding: "8px 24px",
              background: "#c0c0c0",
              border: "2px solid #ffffff",
              borderRightColor: "#404040",
              borderBottomColor: "#404040",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            詳細を見る
          </div>
        </div>

        {/* ステータスバー */}
        <div
          style={{
            display: "flex",
            height: "24px",
            background: "#c0c0c0",
            borderTop: "2px solid #808080",
            padding: "0 8px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#000000",
              display: "flex",
            }}
          >
            {siteConfig.name}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * モダン風テーマ（射撃場ページ）
 * - クリーンなカードデザイン
 * - エメラルドグリーン
 * - 微細なシャドウ
 */
function renderModernTheme(
  title: string,
  subtitle: string | undefined,
  titleFontSize: number
): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 装飾パターン */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.03)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.02)",
          display: "flex",
        }}
      />

      {/* カード */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          maxWidth: "85%",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* バッジ */}
        <div
          style={{
            display: "flex",
            padding: "8px 20px",
            background: "linear-gradient(135deg, #059669, #047857)",
            borderRadius: "100px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#ffffff",
              fontWeight: "600",
              letterSpacing: "0.05em",
              display: "flex",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* タイトル */}
        <div
          style={{
            fontSize: `${titleFontSize}px`,
            fontWeight: "bold",
            color: "#064e3b",
            textAlign: "center",
            lineHeight: 1.2,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* サブタイトル */}
        {subtitle && (
          <div
            style={{
              fontSize: "24px",
              color: "#047857",
              marginTop: "20px",
              textAlign: "center",
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        )}

        {/* 装飾ライン */}
        <div
          style={{
            display: "flex",
            marginTop: "32px",
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #059669, #34d399)",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* フッター */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#34d399",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.8)",
            display: "flex",
          }}
        >
          {siteConfig.baseUrl.replace("https://", "")}
        </div>
      </div>
    </div>
  );
}

/**
 * Linux ターミナル風テーマ（Projects ページ）
 * - CRT モニター風
 * - スキャンライン効果
 * - ターミナルプロンプト
 */
function renderTerminalTheme(
  title: string,
  subtitle: string | undefined,
  titleFontSize: number
): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a0a",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CRT グロー効果 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,40,0,0.15) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* スキャンライン効果 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
          display: "flex",
        }}
      />

      {/* ターミナルヘッダー */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "40px",
          background: "#1a1a1a",
          borderBottom: "1px solid #333",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ff5f56",
              display: "flex",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ffbd2e",
              display: "flex",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#27ca3f",
              display: "flex",
            }}
          />
        </div>
        <div
          style={{
            marginLeft: "20px",
            fontSize: "14px",
            color: "#888",
            display: "flex",
          }}
        >
          user@yrsa: ~/projects
        </div>
      </div>

      {/* ターミナルコンテンツ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          flex: 1,
        }}
      >
        {/* コマンドライン */}
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "#00ff00",
            marginBottom: "24px",
          }}
        >
          <span style={{ color: "#00ff00" }}>$</span>
          <span style={{ marginLeft: "8px", color: "#888" }}>cat README.md</span>
        </div>

        {/* 出力 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "30px",
            background: "rgba(0, 255, 0, 0.03)",
            border: "1px solid rgba(0, 255, 0, 0.2)",
            borderRadius: "4px",
          }}
        >
          {/* サイト名 */}
          <div
            style={{
              fontSize: "18px",
              color: "#00aa00",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            # {siteConfig.name}
          </div>

          {/* タイトル */}
          <div
            style={{
              fontSize: `${Math.min(titleFontSize, 56)}px`,
              fontWeight: "bold",
              color: "#00ff00",
              lineHeight: 1.3,
              display: "flex",
              textShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
            }}
          >
            {title}
          </div>

          {/* サブタイトル */}
          {subtitle && (
            <div
              style={{
                fontSize: "22px",
                color: "#00cc00",
                marginTop: "16px",
                display: "flex",
              }}
            >
              &gt; {subtitle}
            </div>
          )}
        </div>

        {/* カーソル行 */}
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "#00ff00",
            marginTop: "24px",
          }}
        >
          <span>$</span>
          <span
            style={{
              marginLeft: "8px",
              width: "10px",
              height: "20px",
              background: "#00ff00",
              display: "flex",
            }}
          />
        </div>
      </div>

      {/* フッター */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: "#1a1a1a",
          borderTop: "1px solid #333",
          fontSize: "12px",
          color: "#666",
        }}
      >
        <div style={{ display: "flex" }}>
          {siteConfig.baseUrl.replace("https://", "")}
        </div>
        <div style={{ display: "flex" }}>zsh 5.9</div>
      </div>
    </div>
  );
}

/**
 * iOS 9 + Liquid Glass 風テーマ（Links ページ）
 * - フロストガラス効果
 * - 砂丘風グラデーション
 * - 柔らかい影
 */
function renderGlassTheme(
  title: string,
  subtitle: string | undefined,
  titleFontSize: number
): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #a5f3fc 0%, #67e8f9 20%, #22d3ee 40%, #06b6d4 60%, #0891b2 80%, #fcd34d 100%)",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 装飾の円（砂丘風） */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.15)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-50px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "60%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(252, 211, 77, 0.2)",
          display: "flex",
        }}
      />

      {/* ガラスパネル */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px 70px",
          maxWidth: "80%",
          background: "rgba(255, 255, 255, 0.25)",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
        }}
      >
        {/* サイト名 */}
        <div
          style={{
            fontSize: "18px",
            color: "rgba(30, 64, 80, 0.8)",
            marginBottom: "16px",
            fontWeight: "500",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          {siteConfig.name}
        </div>

        {/* タイトル */}
        <div
          style={{
            fontSize: `${titleFontSize}px`,
            fontWeight: "600",
            color: "#164e63",
            textAlign: "center",
            lineHeight: 1.2,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* サブタイトル */}
        {subtitle && (
          <div
            style={{
              fontSize: "22px",
              color: "#0e7490",
              marginTop: "20px",
              textAlign: "center",
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        )}

        {/* ピル型装飾 */}
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            padding: "10px 28px",
            background: "rgba(255, 255, 255, 0.5)",
            borderRadius: "100px",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#0891b2",
              fontWeight: "500",
              display: "flex",
            }}
          >
            リンク集
          </div>
        </div>
      </div>

      {/* フッター */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          display: "flex",
          alignItems: "center",
          padding: "8px 20px",
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "100px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#0e7490",
            fontWeight: "500",
            display: "flex",
          }}
        >
          {siteConfig.baseUrl.replace("https://", "")}
        </div>
      </div>
    </div>
  );
}

/**
 * OGP 画像の URL を生成するヘルパー関数
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
