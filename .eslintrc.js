module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb'],
  plugins: ['babel', 'react', 'react-hooks', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'max-len': ['error', 100, 2, { ignoreUrls: true }],
    'no-console': 'error',
    'no-alert': 'error',
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'react/require-default-props': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'arrow-parens': 'off',
    'react/no-danger': 'off',
    'react/forbid-prop-types': 'off',
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'no-else-return': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  },
};
