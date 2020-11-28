module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  globals: {
    logger: "readonly",
  },
  parserOptions: { ecmaVersion: 2021 },
  plugins: ["jest", "unused-imports", "import", "prettier"],
  ignorePatterns: ["package-lock.json", "package.json"],
  rules: {
    // related to the "unused-imports" plugin
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],

    // related to import sorting and ordering
    "sort-imports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "internal",
          "external",
          ["parent", "sibling"],
          "object",
        ],
        "newlines-between": "always-and-inside-groups",
      },
    ],
    "import/no-duplicates": ["error", { considerQueryString: true }],
    "prettier/prettier": "error",

    // misc
    "require-atomic-updates": "off",
    "no-constant-condition": "off",
    "use-isnan": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
        message: "setTimeout must always be invoked with two arguments.",
      },
      {
        selector:
          "CallExpression[callee.name='setInterval'][arguments.length!=2]",
        message: "setInterval must always be invoked with two arguments.",
      },
    ],
  },
}
