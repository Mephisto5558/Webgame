import config, {tsGlob, jsGlob} from '@mephisto5558/eslint-config';
import globals from 'globals'

/**
 * @type { import('eslint').Linter.Config[] }
 * This config lists all rules from every plugin it uses. */
export default [
  {
    ignores: ['min/**']
  },
  ...config,
  {
    name: 'overwrite',
    files: [`**/*${tsGlob}`, `**/*${jsGlob}`,'**/*.html'],
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