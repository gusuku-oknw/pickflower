
import { createClient } from "@supabase/supabase-js";

// 環境変数から Supabase プロジェクトの URL と Anon キーを取得します。
// NEXT_PUBLIC_ が付く環境変数は、クライアント側でも利用可能な環境変数です。
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://zxzficouapaicapjgtne.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// createClient() を呼び出すことで、Supabase クライアントのインスタンスを生成します。
// これにより、アプリケーション内で Supabase のデータベースや認証 API を利用できるようになります。
export const supabase = createClient(supabaseUrl, supabaseKey);
