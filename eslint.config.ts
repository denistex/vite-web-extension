import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config"
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["watch.js", "dist_*/**"]),
  js.configs.recommended,
  tseslint.configs.recommended, // eslint-disable-line import/no-named-as-default-member
  tseslint.configs.stylistic, // eslint-disable-line import/no-named-as-default-member
  {
    name: "custom/main",
    files: ["**/*.{js,jsx,ts,tsx}"],

    extends: [
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      reactHooksPlugin.configs["recommended-latest"],
      jsxA11yPlugin.flatConfigs.recommended,
      jsxA11yPlugin.flatConfigs.strict,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        chrome: "readonly",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/internal-regex": "^~/",
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      "react/jsx-no-leaked-render": ["warn", { validStrategies: ["ternary"] }],
      "import/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          "newlines-between": "always",
        },
      ],
    },
  },
])
