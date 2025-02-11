module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "@it-incubator/eslint-config",
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    rules: {
        // твои кастомные правила
    },
};
