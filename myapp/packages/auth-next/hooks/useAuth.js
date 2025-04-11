System.register(["@auth0/nextjs-auth0"], function (exports_1, context_1) {
    "use strict";
    // packages/auth-next/hooks/useAuth.tsx
    'use client';
    var nextjs_auth0_1, useAuth;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (nextjs_auth0_1_1) {
                nextjs_auth0_1 = nextjs_auth0_1_1;
            }
        ],
        execute: function () {
            // ※必要に応じてその他のインポートを追加
            exports_1("useAuth", useAuth = () => {
                const { user, error, isLoading } = nextjs_auth0_1.useUser();
                return {
                    user,
                    error,
                    isLoading,
                    login: () => {
                        window.location.href = '/api/auth/login';
                    },
                    logout: () => {
                        window.location.href = '/api/auth/logout';
                    }
                };
            });
        }
    };
});
