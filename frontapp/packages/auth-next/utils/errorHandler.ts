// utils/errorHandler.ts
export const handleError = (error: any): void => {
  // エラーに応じた処理（例：ユーザーへの通知、ログ出力など）
  console.error("エラーが発生しました:", error);
  // 必要であれば、Alertなどを利用してユーザーに通知する処理を追加
};
