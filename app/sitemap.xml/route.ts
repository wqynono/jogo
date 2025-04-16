import { laguageList } from "@/i18n/routing"

export async function GET() {
    const baseUrl = "https://jbuid.top" // 生产环境使用实际域名
    const languages = laguageList

    // 为每种语言创建 sitemap 条目
    const sitemaps = languages.flatMap((locale) => [
        {
            url: `${baseUrl}/${locale}/sitemap.xml`,
            lastModified: new Date(),
        }
    ])

    // 生成 sitemap 索引 XML
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
            .map(
                (sitemap) => `
  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>
  </sitemap>
  `,
            )
            .join("")}
</sitemapindex>`

    // 返回 XML 响应
    return new Response(sitemapIndex, {
        headers: {
            "Content-Type": "application/xml",
        },
    })

}
