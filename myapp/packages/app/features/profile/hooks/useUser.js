System.register(["react", "../api/profileAPI"], function (exports_1, context_1) {
    "use strict";
    var react_1, profileAPI_1;
    var __moduleName = context_1 && context_1.id;
    function useUser(userId) {
        const [user, setUser] = react_1.useState(null);
        const [loading, setLoading] = react_1.useState(true);
        const [error, setError] = react_1.useState(null);
        react_1.useEffect(() => {
            setLoading(true);
            profileAPI_1.fetchUserProfile(userId)
                .then(data => {
                setUser(data);
                setError(null);
            })
                .catch(err => {
                setError(err);
                setUser(null);
            })
                .finally(() => setLoading(false));
        }, [userId]);
        return { user, loading, error };
    }
    exports_1("useUser", useUser);
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (profileAPI_1_1) {
                profileAPI_1 = profileAPI_1_1;
            }
        ],
        execute: function () {
        }
    };
});
