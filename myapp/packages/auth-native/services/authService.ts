// services/authService.ts
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'YOUR_AUTH0_DOMAIN',      // ご自身のAuth0ドメインに置き換えてください
  clientId: 'YOUR_AUTH0_CLIENT_ID'    // ご自身のクライアントIDに置き換えてください
});

// ログイン処理
export const login = async (): Promise<string> => {
  try {
    const credentials = await auth0.webAuth.authorize({
      scope: 'openid profile email',
      audience: 'https://YOUR_AUTH0_DOMAIN/userinfo'
    });
    // ここでは取得したアクセストークンを返しています
    return credentials.accessToken;
  } catch (error) {
    console.error("login error", error);
    throw error;
  }
};

// ログアウト処理
export const logout = (): void => {
  auth0.webAuth.clearSession({})
    .then(success => {
      console.log("ログアウト完了");
    })
    .catch(error => {
      console.error("logout error", error);
    });
};

// トークンのリフレッシュ処理（必要に応じて実装）
export const refreshToken = async (): Promise<string> => {
  try {
    // 実際の実装ではリフレッシュトークンを利用して新しいアクセストークンを取得します
    // 例: const newCreds = await auth0.auth-native.refreshToken({ refreshToken: YOUR_REFRESH_TOKEN });
    //     return newCreds.accessToken;
    // サンプルとして固定のトークン文字列を返す例
    return "NEW_ACCESS_TOKEN";
  } catch (error) {
    console.error("refreshToken error", error);
    throw error;
  }
};
