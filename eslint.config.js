import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-node";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: typescriptParser,
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      node: nodePlugin,
      import: importPlugin,
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "ignore",
        },
      ],
      "node/no-unsupported-features/es-syntax": "off",
    },
    ignores: ["node_modules/", "dist/", "public/"],
  },
];
