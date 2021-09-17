module.exports = {
  extends: 'galex',
  ignorePatterns: ['example-nextjs'],
  rules: {
    'new-cap': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/dynamic-import-chunkname': 'off',
    'prefer-destructuring': 'off',
    'import/order': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
  env: {
    jest: true,
  },
}
