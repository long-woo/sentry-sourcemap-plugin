import * as fs from 'fs'

/**
 * 检查 Sentry 配置文件是否存在
 * @param filePath - sentry.properties、.sentryrc 路径
 * @returns `true`: 存在，`false`: 不存在
 */
const checkSentryrcExist = (filePath: string = '.sentryclirc') => {
  // 若路径中没有 `sentry.properties`、`.sentryrc`，则返回 false
  if (!['sentry.properties', '.sentryclirc'].includes(filePath)) return false

  return fs.existsSync(filePath)
}

/**
 * 在项目根目录创建 `.sentryclirc` 文件
 */
const createSentryrc = () => {
  const isExist = checkSentryrcExist()

  if (isExist) return

  // 创建 .sentryrc 文件
  const fileContent = `
auth.token = Auth Token

defaults.url = Sentry 服务器地址
defaults.org = 组织名称
defaults.project = 项目名称`
  fs.writeFile('.sentryclirc', fileContent, {
    encoding: 'utf-8'
  }, err => {
    if (err) {
      console.log(err)
      return
    }

    console.info('文件创建成功，请在项目根目录的 .sentryclirc 文件填写配置内容。')
  })
}

createSentryrc()
