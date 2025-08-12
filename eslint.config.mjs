import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [

  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'public/**', 'coverage/**'],
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],

    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',

      // غیرفعال کردن کامل قوانین unused vars و unused imports
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
]

export default eslintConfig
