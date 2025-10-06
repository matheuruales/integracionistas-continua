// ESLint v9 flat config
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default [
  // Ignorar directorios de build y dependencias
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  // Reglas base recomendadas de ESLint para JS/TS
  {
    ...js.configs.recommended,
    files: ["**/*.{js,cjs,mjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
  },

  // Soporte de parser para TypeScript y TSX (sin reglas específicas)
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: false,
      },
    },
    rules: {
      // Puedes añadir reglas específicas para TS aquí si las necesitas
    },
  },
];


