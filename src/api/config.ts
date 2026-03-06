/**
 * API のベースURL。
 * 本番: Vercel 等の環境変数 VITE_API_BASE_URL で指定
 * 開発: 未設定時は http://127.0.0.1:8000
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
