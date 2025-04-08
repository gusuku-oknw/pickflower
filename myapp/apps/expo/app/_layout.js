System.register(["react/jsx-runtime", "react", "react-native", "@react-navigation/native", "expo-font", "expo-router", "app/provider", "@my/ui/src/NativeToast"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, react_1, react_native_1, native_1, expo_font_1, expo_router_1, provider_1, NativeToast_1, unstable_settings;
    var __moduleName = context_1 && context_1.id;
    function App() {
        const [interLoaded, interError] = expo_font_1.useFonts({
            Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
            InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
        });
        react_1.useEffect(() => {
            if (interLoaded || interError) {
                // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
                expo_router_1.SplashScreen.hideAsync();
            }
        }, [interLoaded, interError]);
        if (!interLoaded && !interError) {
            return null;
        }
        return _jsx(RootLayoutNav, {});
    }
    exports_1("default", App);
    function RootLayoutNav() {
        const colorScheme = react_native_1.useColorScheme();
        return (_jsx(provider_1.Provider, { children: _jsxs(native_1.ThemeProvider, { value: colorScheme === 'dark' ? native_1.DarkTheme : native_1.DefaultTheme, children: [_jsx(expo_router_1.Stack, {}), _jsx(NativeToast_1.NativeToast, {})] }) }));
    }
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_native_1_1) {
                react_native_1 = react_native_1_1;
            },
            function (native_1_1) {
                native_1 = native_1_1;
            },
            function (expo_font_1_1) {
                expo_font_1 = expo_font_1_1;
            },
            function (expo_router_1_1) {
                expo_router_1 = expo_router_1_1;
            },
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (NativeToast_1_1) {
                NativeToast_1 = NativeToast_1_1;
            }
        ],
        execute: function () {
            exports_1("unstable_settings", unstable_settings = {
                // Ensure that reloading on `/user` keeps a back button present.
                initialRouteName: 'Home',
            });
            // Prevent the splash screen from auto-hiding before asset loading is complete.
            expo_router_1.SplashScreen.preventAutoHideAsync();
        }
    };
});
