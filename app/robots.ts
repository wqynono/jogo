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
            }
        ],
        sitemap: `${URL}/sitemap.xml`,
    }
}