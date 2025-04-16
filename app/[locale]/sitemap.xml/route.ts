import { laguageList } from "@/i18n/routing"
import { defaultGamelist, categoryList } from "@/data/game"

export async function GET(request: Request, { params }: { params: { locale: string } }) {

    const currentLocale = params.locale
    const allLocales = laguageList
    const baseUrl = process.env.BASE_PATH

    // 静态路由
    const staticRoutes = ["", "about", "category", "privacy", "top"]
    const staticEntries = staticRoutes.map((route) => {
        const path = route ? `/${currentLocale}/${route}` : `/${currentLocale}`

        const languageAlternates = allLocales.map((lang) => {
            const alternatePath = route ? `/${lang}/${route}` : `/${lang}`
            return `<xhtml:link  rel="alternate"  hreflang="${lang}" href="${baseUrl}${alternatePath}"/>`
        }).join("\n")

        return `<url>
                    <loc>${baseUrl}${path}</loc>
                    <changefreq>${route === "" ? "daily" : "weekly"}</changefreq>
                    <priority>${route === "" ? "1.0" : "0.8"}</priority>
                    ${languageAlternates}
                </url>`
    })

    // 游戏列表
    const gameEntries = defaultGamelist.map(game => {
        const path = `/${currentLocale}/game/${game.name}`

        const languageAlternates = allLocales.map(lang => {
            return `<xhtml:link rel="alternate" hreflang="${lang}"  href="${baseUrl}/${lang}/game/${game.name}"/>`
        }).join('\n')

        return `<url>
                    <loc>${baseUrl}${path}</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.7</priority>
                    ${languageAlternates}
                </url>`
    })

    // 游戏分类
    const categoryEntries = categoryList.map(category => {
        const path = `/${currentLocale}/category/${category.name}`
        const languageAlternates = allLocales.map(lang => {
            return `<xhtml:link rel="alternate" hreflang="${lang}"  href="${baseUrl}/${lang}/category/${category.name}"/>`
        }).join('\n')

        return `<url>
                <loc>${baseUrl}${path}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
                ${languageAlternates}
            </url>`
    })

    const allEntries = [...staticEntries, ...gameEntries, ...categoryEntries].join('\n')

    // 完整的 XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
                        ${allEntries}
                     </urlset>`

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    })

}
