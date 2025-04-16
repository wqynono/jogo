import type { MetadataRoute } from "next"
import { laguageList } from "@/i18n/routing"

// 获取游戏总数
async function getGamesCount() {
    // 这里应该是实际获取游戏总数的代码
    return 100000 // 示例数量
}

// 分页获取游戏
async function getGamesPaginated(start: number, limit: number) {
    // 这里应该是实际分页获取游戏的代码
    return Array.from({ length: limit }, (_, i) => ({
        id: `game${start + i}`,
        updatedAt: new Date(),
    }))
}

// 生成多个sitemap
export async function generateSitemaps() {
    // 获取游戏总数
    const count = await getGamesCount()

    // 每个sitemap最多包含40000个URL
    const GAMES_PER_SITEMAP = 40000

    // 计算需要多少个sitemap
    const pages = Math.ceil(count / GAMES_PER_SITEMAP)

    // 返回sitemap ID数组
    return Array.from({ length: pages }, (_, i) => ({ id: i }))
}

// 为每个sitemap ID生成内容
export default async function sitemap({
    id,
    params: { locale },
}: {
    id: number
    params: { locale: string }
}): Promise<MetadataRoute.Sitemap> {
    const BASE_URL = "https://jbuid.top"
    const languages = laguageList

    // 计算分页
    const GAMES_PER_SITEMAP = 40000
    const start = id * GAMES_PER_SITEMAP

    // 获取当前页的游戏
    const games = await getGamesPaginated(start, GAMES_PER_SITEMAP)

    // 生成sitemap条目
    return games.map((game) => ({
        url: `${BASE_URL}/${locale}/game/${game.id}`,
        lastModified: game.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
            languages: languages.reduce(
                (acc, lang) => {
                    acc[lang] = `${BASE_URL}/${lang}/game/${game.id}`
                    return acc
                },
                {} as Record<string, string>,
            ),
        },
    }))
}
