import type { MetadataRoute } from 'next'
import { defaultGamelist, categoryList } from '@/data/game'
import { laguageList } from '@/i18n/routing'

// 导出一个默认的异步函数，用于生成网站地图
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 定义网站的URL
    const BASE_URL = "https://jbuid.top"
    const languages = laguageList
    const lastModified = new Date();
    const entries: MetadataRoute.Sitemap = [];

    // 首页多语言
    entries.push({
        url: `${BASE_URL}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 1,
    });


    return entries;
}
