import AdComponent from "@/components/ad" // 导入广告组件
import { defaultGamelist, categoryList } from "@/data/game"
import React from "react"
import GameSlide from "@/components/game-slide"
import siteMetadata from "@/data/siteMetadata";
import adConfig from "@/data/adConfig"
import { getTranslations } from 'next-intl/server';
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

                        <div className="bg-white shadow-md my-4 min-h-[270px] border-1 border-gray-200 rounded-lg ">
                            <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1 ">
                                {t("advertisement")}</span>
                            <AdComponent data-ad-slot={adConfig.hx} data-ad-format={"auto"} data-full-width-responsive={true} />
                        </div>

                        {categoryList.map((category) => (
                            <GameSlide key={category.name} name={category.name} games={defaultGamelist.filter((game) => game.category === category.name)} viewAllLink={category.href} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

