# typedoc-plugin-resolve-by-name

[![npm version](https://img.shields.io/npm/v/typedoc-plugin-resolve-by-name.svg?style=flat)](https://npmjs.org/package/typedoc-plugin-resolve-by-name 'View this project on npm')
[![git repository](https://img.shields.io/badge/source-GitHub-blue)](https://github.com/adamjarret/typedoc-plugin-resolve-by-name 'View this project on GitHub')

A plugin for [TypeDoc](http://typedoc.org) that enables unresolved type reflections to be resolved using only their name (as opposed to their fully qualified identifier).

Caution: If all exported `type`/`interface`/`function`/`class`/etc names are not unique
within your project, results may be unpredictable.

## Installation

```bash
npm i -D typedoc-plugin-resolve-by-name typedoc
# yarn add -D typedoc-plugin-resolve-by-name typedoc
```

## Usage

TypeDoc automatically loads all installed plugins, so just run the `typedoc` command:

```bash
npx typedoc
# yarn typedoc
```

## Example

Example **typedoc.js** file (in project root):

```js
module.exports = {
  name: 'PROJECT NAME',
  mode: 'modules',
  out: 'docs',
  exclude: [
    // exclude index.ts files to ignore re-exports
    '**/index.ts',
    // exclude node_modules directories
    '**/node_modules/**',
    // exclude built output from tsc
    '**/packages/**/lib/**',
    // exclude files in __tests__ directories
    '**/__tests__/**',
    // exclude unit tests
    '**/*.test.ts'
  ],
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  excludeNotExported: true
};
```

## License

[MIT](https://github.com/adamjarret/typedoc-plugin-resolve-by-name/tree/master/LICENSE)

## Author

[Adam Jarret](https://atj.me)
