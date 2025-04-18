type EnvConfig = {
  baseUrl: string
  themeUrl: string
  isPrd: boolean
  locales: string[]
}

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * articleUrl: 文章地址
 */

let config: EnvConfig = {
  baseUrl: '',
  themeUrl: '',
  isPrd: true, // 是否为线上
  locales: ['zh-CN', 'zh-TW', 'en-US', 'th'],
}
switch (import.meta.env.MODE) {
  case 'development':
    /*
     * 开发环境    => npm run dev
     */
    config.isPrd = false
    config.baseUrl = '/devServer'
    config.themeUrl = '/theme-react/dist/theme-react/source'
    break
  case 'production':
    /*
     * 线上环境 => npm run build
     */
    config.isPrd = true
    config.baseUrl = 'https://nutui.jd.com'
    config.themeUrl = './source'
    break
}
export default config
