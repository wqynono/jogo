// app/sitemap.ts
import { laguageList } from "@/i18n/routing"
import { defaultGamelist, categoryList } from "@/data/game"

export default async function sitemap() {
    const allLocales = laguageList
    const baseUrl = process.env.BASE_PATH || "https://jbuid.top"

    // 静态路由（所有语言版本）
    const staticRoutes = ["", "about", "category", "privacy", "top"]
    const staticEntries = allLocales.flatMap(locale => {
        return staticRoutes.map(route => ({
            url: `${baseUrl}/${locale}${route ? `/${route}` : ''}`,
            lastModified: new Date(),
            changeFrequency: route === "" ? 'daily' : 'weekly' as const,
            priority: route === "" ? 1.0 : 0.8,
            alternates: {
                languages: Object.fromEntries(
                    allLocales.map(lang => [
                        lang,
                        `${baseUrl}/${lang}${route ? `/${route}` : ''}`
                    ])
                )
            }
        }))
    })

    // 游戏列表（所有语言版本）
    const gameEntries = allLocales.flatMap(locale => {
        return defaultGamelist.map(game => ({
            url: `${baseUrl}/${locale}/game/${game.name}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
            alternates: {
                languages: Object.fromEntries(
                    allLocales.map(lang => [
                        lang,
                        `${baseUrl}/${lang}/game/${game.name}`
                    ])
                )
            }
        }))
    })

    // 游戏分类（所有语言版本）
    const categoryEntries = allLocales.flatMap(locale => {
        return categoryList.map(category => ({
            url: `${baseUrl}/${locale}/category/${category.name}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
            alternates: {
                languages: Object.fromEntries(
                    allLocales.map(lang => [
                        lang,
                        `${baseUrl}/${lang}/category/${category.name}`
                    ])
                )
            }
        }))
    })

    return [...staticEntries, ...gameEntries, ...categoryEntries]
}