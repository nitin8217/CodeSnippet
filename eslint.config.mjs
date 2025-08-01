import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/src/generated/**",
      "**/prisma/generated/**", 
      "**/.next/**",
      "**/node_modules/**",
      "**/build/**",
      "**/dist/**"
    ]
  },
  {
    rules: {
      // Relax some rules for deployment
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-this-alias": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn"
    }
  }
];

export default eslintConfig;
