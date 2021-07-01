import { Compiler } from 'webpack';
import { SentryCliPluginOptions } from '@sentry/webpack-plugin';
import rimraf from 'rimraf'
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

interface ISentrySourcemapPluginOptions {
  /**
   * Map 文件地址。默认 `dist` 目录下的所有 .map 文件
   */
  path?: string;

  /**
   * Sentry 配置
   */
  sentryConfig: SentryCliPluginOptions
}

class SentrySourcemapPlugin {
  private readonly pluginName = 'SentrySourcemapPlugin'
  private readonly path:string = './dist/**/*.map'
  private readonly sentryConfig: SentryCliPluginOptions = {
    release: '1.0.0',
    include: './dist',
    configFile: '.sentryclirc'
  }

  constructor(options: ISentrySourcemapPluginOptions) {
    if (options?.path) {
      this.path = options.path
    }
    this.sentryConfig = options?.sentryConfig
  }

  /**
   * 注入 Sentry 的 Webpack 插件
   */
  injectSentryPlugin() {
    new SentryWebpackPlugin(this.sentryConfig)
  }

  apply(compiler: Compiler) {
    this.injectSentryPlugin()

    // 编译完成后，移除 map 文件
    compiler.hooks.done.tap(this.pluginName, () => {
      rimraf.sync(this.path)
    })
  }
}

export { SentrySourcemapPlugin }
