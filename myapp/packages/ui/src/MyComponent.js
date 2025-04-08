System.register(["tamagui"], function (exports_1, context_1) {
    "use strict";
    var tamagui_1, MyComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tamagui_1_1) {
                tamagui_1 = tamagui_1_1;
            }
        ],
        execute: function () {
            exports_1("MyComponent", MyComponent = tamagui_1.styled(tamagui_1.YStack, {
                name: 'MyComponent',
                bg: 'red',
                variants: {
                    blue: {
                        true: {
                            bg: 'blue',
                        },
                    },
                },
            }));
        }
    };
});
