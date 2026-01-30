import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,

      prettierConfig,
    ],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Prettier 결과를 에러로 강제

      // 연산자 공백
      "space-infix-ops": "error",

      // 콤마 뒤 공백
      "comma-spacing": ["error", { before: false, after: true }],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.app.json"],
        },
      },
    },
  },
]);
