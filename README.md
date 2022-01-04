# sentry-sourcemap-plugin

> `@sentry/webpack-plugin` extended webpack plugin.

![npm (scoped)](https://img.shields.io/npm/v/@longwoo/sentry-sourcemap-plugin?color=%23be3031&style=flat-square)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/long-woo/sentry-sourcemap-plugin?include_prereleases&style=flat-square)
![npm download](https://img.shields.io/npm/dm/@longwoo/sentry-sourcemap-plugin?style=flat-square)
![GitHub license](https://img.shields.io/github/license/long-woo/sentry-sourcemap-plugin?style=flat-square)

[中文](https://github.com/long-woo/sentry-sourcemap-plugin/blob/master/README_ZH.md)

Sentry automatically deletes the SourceMap file after uploading it Map file.

⚠️ This plugin is configured with some initial values by default:：

- release: '1.0.0', automatically read the `version` in the current project `package.json`。
- include: './dist'。
- configFile: '.sentryclirc'。

## Use

### Install

> 💡 `@longwoo/sentry-sourcemap-plugin` already contains `@sentry/webpack-plugin` plugin, no need to install it.
The configuration is consistent with [`@sentry/webpack-plugin`](https://www.npmjs.com/package/@sentry/webpack-plugin).

```sh
npm install @longwoo/sentry-sourcemap-plugin --save-dev
# or
yarn add @longwoo/sentry-sourcemap-plugin -D
```

### Vue project

Add the following configuration in the `vue.config.js` file:

```js
const { SentrySourcemapPlugin } = require('@longwoo/sentry-sourcemap-plugin')

module.exports = {
  configureWebpack: config => {
    config.plugins.push(new SentrySourcemapPlugin())
  }
}
```

### Webpack

Added in the `plugins` option of the `webpack.config.js` file:

```js
const { SentrySourcemapPlugin } = require('@longwoo/sentry-sourcemap-plugin')

module.exports = {
  plugins: [
    new SentrySourcemapPlugin()
  ]
}
```
