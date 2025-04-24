
import { getTranslations } from 'next-intl/server';
import GameGrid from "@/components/game-grid"
import AdComponent from "@/components/ad" // 导入广告组件
import { defaultGamelist } from "@/data/game"
import React from "react"
import adConfig from "@/data/adConfig"
import RecentlyPlayedSection from "@/components/recently-played-section"
import siteMetadata from "@/data/siteMetadata"
import type { Metadata } from 'next'
type Props = {
  params: Promise<{ category: string }>
}
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { category } = await params

  return {
    title: category,
  };
}
export default async function Category({ params }: any) {
  const t = await getTranslations("HomePage")
  const tCategories = await getTranslations("Categories");
  const tDesc = await getTranslations("CategoriesDesc");
  const { category } = params;
  const gamelist = defaultGamelist.filter((game) => game.category === category)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${tCategories(category.toLowerCase())} - ${siteMetadata.name}`,
    "url": siteMetadata.siteUrl,
    "description": `${tDesc(category.toLowerCase())}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": gamelist
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
      <div className="max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
        <div className="mx-auto px-4 py-6">
          <h2 className="text-xl font-bold mb-4 font-sans">
            {tCategories(params.category.toLowerCase())}
          </h2>
          <GameGrid gamelist={gamelist} gameMobileLength={gamelist.length} gamePcLength={gamelist.length} adSlot={adConfig.zfx[0]} />
          <div className="bg-white shadow-md my-4 min-h-[270px] border-1 border-gray-200 rounded-lg ">
            <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1">
              {t("advertisement")}</span>
            <AdComponent data-ad-slot={adConfig.hx} data-ad-format={"auto"} data-full-width-responsive={true} />
          </div>

          {/* 玩过的游戏 */}
          <RecentlyPlayedSection />
        </div>
      </div>
    </div>
  )
}

