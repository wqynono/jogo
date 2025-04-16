import type { MetadataRoute } from 'next'
import { defaultGamelist, categoryList } from '@/data/game'
import { laguageList } from '@/i18n/routing'

export default function robots(): MetadataRoute.Robots {
    const URL = "https://jbuid.top/"
    const languages = laguageList // ['en', 'zh', 'ja', 'ko', 'ru']


    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                ]
            }, {
                userAgent: 'Googlebot-Image',
                allow: [
                    // 允许所有语言的游戏图片
                    ...languages.flatMap(lang =>
                        defaultGamelist.map(item => `/${lang}/game/${item.name}`))
                ]
            }
        ],
        sitemap: `${URL}/sitemap.xml`,
    }
}