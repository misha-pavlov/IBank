module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  jsxBracketSameLine: true,
  printWidth: 120,
  tabWidth: 2,
  parser: 'flow',
  semi: true,
  useTabs: false,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: { parser: 'typescript' }
    }
  ]
};
