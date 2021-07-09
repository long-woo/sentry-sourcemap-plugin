# sentry-sourcemap-plugin

> 扩展 `@sentry/webpack-plugin` 插件。

![npm (scoped)](https://img.shields.io/npm/v/@longwoo/sentry-sourcemap-plugin?color=%23be3031&style=flat-square)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/long-woo/sentry-sourcemap-plugin?include_prereleases&style=flat-square)
![npm download](https://img.shields.io/npm/dm/@longwoo/sentry-sourcemap-plugin?style=flat-square)
![GitHub license](https://img.shields.io/github/license/long-woo/sentry-sourcemap-plugin?style=flat-square)

Sentry 上传 sourcemap 文件后，自动删除 .map 文件。

⚠️ 此插件默认配置了一些初始值：
- release: '1.0.0'，自动读取当前项目 `package.json` 中的 `version`。
- include: './dist'。
- configFile: '.sentryclirc'。

## 使用

### 安装

> @longwoo/sentry-sourcemap-plugin 已经包含 @sentry/webpack-plugin 插件，无需安装它。

```sh
npm install @longwoo/sentry-sourcemap-plugin --save-dev
# 或
yarn add @longwoo/sentry-sourcemap-plugin -D
```

### vue 项目中，在 `vue.config.js` 文件添加如下配置：

```js
const { SentrySourcemapPlugin } = require('@longwoo/sentry-sourcemap-plugin')

module.exports = {
  configureWebpack: config => {
    config.plugins.push(new SentrySourcemapPlugin())
  }
}
```

### 其他项目，在 `webpack.config.js` 文件的 `plugins` 选项中增加。

```js
const { SentrySourcemapPlugin } = require('@longwoo/sentry-sourcemap-plugin')

module.exports = {
  plugins: [
    new SentrySourcemapPlugin()
  ]
}
```
