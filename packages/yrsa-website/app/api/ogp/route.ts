import { NextRequest } from "next/server";
import { z } from "zod";
import { createOpengraphImage, type OgpTheme } from "@/lib/server/opengraph";

/**
 * クエリパラメータのスキーマ
 */
const querySchema = z.object({
  title: z.string().min(1).max(100).default("横須賀市ライフル射撃協会"),
  subtitle: z.string().max(100).optional(),
  theme: z
    .enum(["default", "cern", "win95", "modern", "terminal", "glass"])
    .default("default"),
});

/**
 * OGP 画像を動的に生成する API エンドポイント
 *
 * @example
 * GET /api/ogp?title=月例会&theme=win95
 * GET /api/ogp?title=射撃場案内&subtitle=くりはま花の国&theme=modern
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // パラメータを取得
  const rawParams = {
    title: searchParams.get("title") ?? undefined,
    subtitle: searchParams.get("subtitle") ?? undefined,
    theme: searchParams.get("theme") ?? undefined,
  };

  // バリデーション
  const result = querySchema.safeParse(rawParams);

  if (!result.success) {
    // バリデーションエラー時はデフォルト値で画像を生成
    return createOpengraphImage({
      title: "横須賀市ライフル射撃協会",
      theme: "default",
    });
  }

  const { title, subtitle, theme } = result.data;

  return createOpengraphImage({
    title,
    subtitle,
    theme: theme as OgpTheme,
  });
}
