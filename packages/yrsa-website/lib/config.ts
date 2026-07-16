/**
 * サイト設定のデフォルト値
 */
const defaults = {
  baseUrl: "https://yokosuka.kanagawa-rifle.org",
  name: "横須賀市ライフル射撃協会",
  shortName: "YRSA",
  telephone: "046-823-0617",
  email: "yokosukarifle@gmail.com",
  postalCode: "238-0042",
  address: "神奈川県横須賀市汐入町2-2 サンロク商事内",
} as const;

/**
 * サイト設定
 *
 * 環境変数で上書き可能:
 * - NEXT_PUBLIC_SITE_BASE_URL
 * - NEXT_PUBLIC_SITE_NAME
 * - NEXT_PUBLIC_SITE_SHORT_NAME
 * - NEXT_PUBLIC_SITE_TELEPHONE
 * - NEXT_PUBLIC_SITE_EMAIL
 * - NEXT_PUBLIC_SITE_POSTAL_CODE
 * - NEXT_PUBLIC_SITE_ADDRESS
 */
export const siteConfig = {
  /** サイトのベースURL */
  baseUrl: process.env.NEXT_PUBLIC_SITE_BASE_URL || defaults.baseUrl,
  /** サイト名 */
  name: process.env.NEXT_PUBLIC_SITE_NAME || defaults.name,
  /** 略称 */
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || defaults.shortName,
  /** 連絡先電話番号 */
  telephone: process.env.NEXT_PUBLIC_SITE_TELEPHONE || defaults.telephone,
  /** メールアドレス */
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || defaults.email,
  /** 郵便番号 */
  postalCode: process.env.NEXT_PUBLIC_SITE_POSTAL_CODE || defaults.postalCode,
  /** 住所 */
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS || defaults.address,
} as const;
