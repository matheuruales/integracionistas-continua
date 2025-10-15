// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // 🧹 Ignorar carpetas comunes
  { ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**"] },

  // 🌍 Configuración base de JS y TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ⚛️ Configuración React moderna
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  // ⚙️ Reglas personalizadas
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "warn"
    },
    settings: {
      react: { version: "detect" }
    }
  }
];