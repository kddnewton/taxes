import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "tsconfig.test.json",
      },
    },
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
      "import": importPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": typescriptEslintPlugin
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".d.ts"],
        },
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      "import/no-unresolved": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    ignores: ["/coverage/", "/docs/"],
  },
];
