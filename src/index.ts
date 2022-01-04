import { Compiler } from 'webpack';
import SentryWebpackPlugin, { SentryCliPluginOptions } from '@sentry/webpack-plugin';
import rimraf from 'rimraf'

// 默认包含路径
const DEFAULT_INCLUDE = './dist'

class SentrySourcemapPlugin {
  private readonly pluginName = 'SentrySourcemapPlugin'
  private readonly mapFilePath: string = `${DEFAULT_INCLUDE}/**/*.map`
  private readonly sentryConfig: SentryCliPluginOptions = {
    release: '1.0.0',
    include: DEFAULT_INCLUDE,
    configFile: '.sentryclirc'
  }

  constructor(options: SentryCliPluginOptions) {
    this.sentryConfig = {
      ...this.sentryConfig,
      release: process.env.npm_package_version,
      ...options
    }
    this.mapFilePath = `${this.sentryConfig.include}/**/*.map`
  }

  /**
   * 注入 Sentry 的 Webpack 插件
   */
  injectSentryPlugin(compiler: Compiler) {
    const sentryWebpackPlugin = new SentryWebpackPlugin(this.sentryConfig)

    compiler.options.plugins.push(sentryWebpackPlugin)
  }

  /**
   * 插件 apply 方法
   * @param compiler - Webpack 插件 compiler 对象
   */
  apply(compiler: Compiler) {
    this.injectSentryPlugin(compiler)
    
    // 编译完成后，移除 map 文件
    compiler.hooks.done.tap(this.pluginName, () => {
      rimraf.sync(this.mapFilePath)
      console.log('.map 文件删除完成')
    })
  }
}

export { SentrySourcemapPlugin }
