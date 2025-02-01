import config from '@mephisto5558/eslint-config';
import globals from 'globals'

/**
 * @type { import('eslint').Linter.Config[] }
 * This config lists all rules from every plugin it uses. */
export default [
  ...config,
  {
    name: 'overwrite',
    files: ['**/*.js', '**/*.html'],
    languageOptions: {
      globals: {
        ...globals.es2024,
        ...globals.browser,
        Swal: 'readable',
        clickCount: 'writeable',
        stats: 'readonly',
        shopItems: 'readonly',
        advancements: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-magic-numbers': 'off'
    }
  }
];