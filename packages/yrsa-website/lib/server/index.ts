/**
 * サーバーサイド専用モジュール
 *
 * このディレクトリのモジュールは Server Components や API Routes でのみ使用可能です。
 * Client Components では使用しないでください。
 */

export {
  createOpengraphImage,
  getOpengraphImageUrl,
  type CreateOpengraphImageOptions,
  type OgpTheme,
} from './opengraph'; // .tsx extension auto-resolved
