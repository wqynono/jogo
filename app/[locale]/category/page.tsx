import AdComponent from "@/components/ad" // 导入广告组件
import { defaultGamelist, categoryList } from "@/data/game"
import React from "react"
import GameSlide from "@/components/game-slide"
import siteMetadata from "@/data/siteMetadata";
import adConfig from "@/data/adConfig"
import { getTranslations } from 'next-intl/server';
import { Metadata } from "next";
import { laguageList } from "@/i18n/routing"
export async function generateStaticParams() {
    const locales = laguageList; // 支持的语言列表

    return categoryList.flatMap((category) =>
        locales.map((locale) => ({
            category: category.name,
            locale,
        }))
    )
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return {
        alternates: {
            canonical: `${siteMetadata.siteUrl}/${locale}/category`,
            languages: {
                'en': `${siteMetadata.siteUrl}/en/category`,
                'ja': `${siteMetadata.siteUrl}/ja/category`,
                'ko': `${siteMetadata.siteUrl}/ko/category`,
                'zh': `${siteMetadata.siteUrl}/zh/category`,
                'ru': `${siteMetadata.siteUrl}/ru/category`,
                'x-default': `${siteMetadata.siteUrl}/en/category`,
            },
        },
    }

}


export default async function Category() {
    const t = await getTranslations("HomePage")

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": `categoryList - ${siteMetadata.name}`,
        "url": siteMetadata.siteUrl,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": categoryList
        }
    }
    return (
        <div>
            <section>
                <script
                    async
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </section>
            <div className="min-h-screen">
                <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
                    <div className="mx-auto px-4 py-6">
                        {/* 
                        <div className="bg-white shadow-md my-4 min-h-[270px] border-1 border-gray-200 rounded-lg ">
                            <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1 ">
                                {t("advertisement")}</span>
                            <AdComponent data-ad-slot={adConfig.hx} data-ad-format={"auto"} data-full-width-responsive={true} />
                        </div> */}

                        {categoryList.map((category) => (
                            <GameSlide key={category.name} name={category.name} games={defaultGamelist.filter((game) => game.category === category.name)} viewAllLink={category.href} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

