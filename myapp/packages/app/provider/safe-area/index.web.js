System.register(["react/jsx-runtime"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, SafeArea;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            }
        ],
        execute: function () {
            // on Web, we don't use React Navigation, so we are going to avoid the safe area provider
            // instead, we just have a no-op here
            // for more, see: https://solito.dev/recipes/tree-shaking
            // if you need safe area hooks yourself, you can implement this yourself
            // however, you may be better off using the CSS selector for env(safe-area-inset-top) on Web
            // for more, see the `./use-safe-area.web.ts` file
            exports_1("SafeArea", SafeArea = ({ children }) => _jsx(_Fragment, { children: children }));
        }
    };
});
