module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },

  extends: [
    'airbnb-base', 
    "plugin:@typescript-eslint/recommended",
  ],
  
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true, 'optionalDependencies': true, 'peerDependencies': true}],
    '@typescript-eslint/ban-ts-ignore': 'off',
    'max-len': [0, { code: 100, ignoreStrings: true }],
  },

  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  },
};
