System.register(["react", "../../../apps/next/utils/supabase"], function (exports_1, context_1) {
    "use strict";
    var react_1, supabase_1, useSupabaseAuth;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (supabase_1_1) {
                supabase_1 = supabase_1_1;
            }
        ],
        execute: function () {
            exports_1("useSupabaseAuth", useSupabaseAuth = () => {
                const [user, setUser] = react_1.useState(null);
                const [loading, setLoading] = react_1.useState(true);
                const [error, setError] = react_1.useState(null);
                react_1.useEffect(() => {
                    const getInitialSession = async () => {
                        try {
                            // 非同期でセッションを取得する
                            const { data: { session }, error } = await supabase_1.supabase.auth.getSession();
                            if (error) {
                                setError(error);
                            }
                            setUser(session?.user ?? null);
                        }
                        catch (err) {
                            setError(err);
                        }
                        finally {
                            setLoading(false);
                        }
                    };
                    getInitialSession();
                    // 認証状態の変化を監視
                    const { data: authListener } = supabase_1.supabase.auth.onAuthStateChange((event, session) => {
                        setUser(session?.user ?? null);
                        setLoading(false);
                    });
                    return () => {
                        // subscription の解除（v2 では .subscription.unsubscribe() が必要です）
                        authListener.subscription.unsubscribe();
                    };
                }, []);
                const signUp = async (email, password) => {
                    const { data, error } = await supabase_1.supabase.auth.signUp({ email, password });
                    if (error) {
                        console.error('Sign Up Error:', error.message);
                        throw error;
                    }
                    return data.user;
                };
                const signIn = async (email, password) => {
                    const { data, error } = await supabase_1.supabase.auth.signInWithPassword({ email, password });
                    if (error) {
                        console.error('Sign In Error:', error.message, error);
                        // ここでエラーの内容に応じたメッセージを返すこともできます
                        // 例: error.message に "Email not confirmed" が含まれている場合、ユーザーにメールを確認するよう促す
                        throw error;
                    }
                    return data.user;
                };
                const signOut = async () => {
                    const { error } = await supabase_1.supabase.auth.signOut();
                    if (error) {
                        console.error('Sign Out Error:', error.message);
                        throw error;
                    }
                };
                return { user, loading, error, signUp, signIn, signOut };
            });
        }
    };
});
