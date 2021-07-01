import fs from 'fs'
import { Compiler } from 'webpack';
import SentryWebpackPlugin, { SentryCliPluginOptions } from '@sentry/webpack-plugin';
import rimraf from 'rimraf'

// 默认包含路径
const DEFAULT_INCLUDE = './dist'

class SentrySourcemapPlugin {
  private readonly pluginName = 'SentrySourcemapPlugin'
  private readonly mapFilePath:string = `${DEFAULT_INCLUDE}/**/*.map`
  private readonly sentryConfig: SentryCliPluginOptions = {
    release: '1.0.0',
    include: DEFAULT_INCLUDE,
    configFile: '.sentryclirc'
  }

  constructor(options: SentryCliPluginOptions) {
    const release = this.getRelease()

    this.sentryConfig = {
      ...this.sentryConfig,
      release,
      ...options
    }
    this.mapFilePath = `${this.sentryConfig.include}/**/*.map`
  }

  /**
   * 获取 package.json 文件的 version
   */
  getRelease() {
    const fileContent = fs.readFileSync('./package.json', { encoding: 'utf-8' })
    const json = JSON.parse(fileContent)
    
    return json.version
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
