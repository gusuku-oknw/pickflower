// dbService.ts
import { supabase } from './supabase'  // 事前に初期化した supabaseClient クライアント

/**
 * ユーザーIDに基づいて関連データ（例: user_data テーブル）を取得する
 * @param {string} userId - ログインユーザーの ID
 * @returns {Promise<object[]>} データ配列またはエラー情報
 */
export async function fetchUserData(userId: string) {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('fetchUserData エラー:', error);
    throw error;
  }
  return data;
}

export async function fetchTermsData() {
  const { data, error } = await supabase
    .from('legal_documents.Terms')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('fetchUserData エラー:', error);
    throw error;
  }
  return data;
}

export async function fetchPolicyData() {
  const { data, error } = await supabase
    .from('legal_documents.Policy')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('fetchUserData エラー:', error);
    throw error;
  }
  return data;
}


/**
 * 新しいレコードを user_data テーブルに挿入する
 * @param {object} newRecord - 挿入したいデータのオブジェクト
 * @returns {Promise<object[]>}
 */
export async function insertUserData(newRecord) {
  const { data, error } = await supabase
    .from('user_data')
    .insert([newRecord])
  if (error) {
    console.error('insertUserData エラー:', error)
    throw error
  }
  return data
}

/**
 * 指定のレコードを更新する
 * @param {string} userId - 更新対象となるユーザーのID
 * @param {object} updatedData - 更新するデータのオブジェクト
 * @returns {Promise<object[]>}
 */
export async function updateUserData(userId, updatedData) {
  const { data, error } = await supabase
    .from('user_data')
    .update(updatedData)
    .eq('user_id', userId)
  if (error) {
    console.error('updateUserData エラー:', error)
    throw error
  }
  return data
}

/**
 * 指定のレコードを削除する
 * @param {string} userId - 削除対象となるユーザーのID
 * @returns {Promise<object[]>}
 */
export async function deleteUserData(userId) {
  const { data, error } = await supabase
    .from('user_data')
    .delete()
    .eq('user_id', userId)
  if (error) {
    console.error('deleteUserData エラー:', error)
    throw error
  }
  return data
}

/**
 * 取得したデータをJSONファイルとしてエクスポートする
 * @param {object[]} data - エクスポートするデータ
 * @param {string} filename - 保存するファイル名
 */
export function exportDataToFile(data, filename = 'data.json') {
  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
