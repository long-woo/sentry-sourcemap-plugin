import * as fs from 'fs'
import * as path from 'path'

const pathResolve = (fileName: string) => path.resolve(process.cwd(), '../../../', fileName)
const RC_FILE = pathResolve('./.sentryclirc')
const PROPERTIES_FILE = pathResolve('./sentry.properties')

/**
 * 检查项目根目录 Sentry 配置文件是否存在
 * @returns `true`: 存在，`false`: 不存在
 */
const checkSentryrcExist = () => fs.existsSync(RC_FILE) || fs.existsSync(PROPERTIES_FILE)

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
  fs.writeFile(RC_FILE, fileContent, {
    encoding: 'utf-8'
  }, err => {
    if (err) {
      console.log(err)
      return
    }

    console.log('文件创建成功，请在项目根目录的 .sentryclirc 文件填写配置内容。')
  })
}

createSentryrc()
