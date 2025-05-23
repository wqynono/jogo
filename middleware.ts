import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
// 创建自定义中间件配置
const middleware = createMiddleware({
  ...routing,
  // 添加语言检测配置
  localeDetection: false, // 禁用自动语言检测
  defaultLocale: 'en'    // 强制使用英文作为默认语言
})

export default middleware



export const config = {
  // 匹配所有路径名，除了：
  // - 以 `/api`, `/trpc`, `/_next` 或 `/_vercel` 开头的
  // - 包含点的（例如 `favicon.ico`）
  // - 以 .xml 结尾的（允许直接访问 sitemap.xml）
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*|.*\\.xml).*)", "/"],
}
