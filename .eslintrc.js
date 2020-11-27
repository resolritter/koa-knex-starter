const fs = require("fs")
const path = require("path")

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const getSubDirectoriesRegex = (dir) => {
  const regexGroup = fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .map((filePath) =>
      filePath.isDirectory()
        ? filePath.name
        : filePath.name.substr(0, filePath.name.lastIndexOf(".")) ||
          filePath.name,
    )
    .reduce((acc, filePath) => `${acc}|${escapeRegExp(filePath)}`, "")

  return `^(${regexGroup})(\\/.*|$)`
}

const nodeModulesImportRegex = getSubDirectoriesRegex(
  path.join(__dirname, "./node_modules"),
)

const rootModulesImportRegex = getSubDirectoriesRegex(
  path.join(__dirname, "./src"),
)

module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: { ecmaVersion: 2021 },
  plugins: ["unused-imports", "simple-import-sort", "jest"],
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

    // related to the "simple-import-sort" plugin
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react(\\/.*|$)", nodeModulesImportRegex],
          [rootModulesImportRegex],
          [
            "^\\.$",
            // Parent imports
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            // Other relative imports
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
          ],
        ],
      },
    ],

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
