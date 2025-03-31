
import { getTranslations } from 'next-intl/server';
import GameGrid from "@/components/game-grid"
import AdComponent from "@/components/ad" // 导入广告组件
import { defaultGamelist } from "@/data/game"
import React from "react"
import adConfig from "@/data/adConfig"
import RecentlyPlayedSection from "@/components/recently-played-section"

export default async function Category({ params }: any) {
  const t = await getTranslations('HomePage');
  const { category } = params;
  const gamelist = defaultGamelist.filter((game) => game.category === category)
  return (
    <div>
      <div className="min-h-screen">
        <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
          <div className="mx-auto px-4 py-6">
            <h2 className="text-xl font-bold mb-4 font-sans">{params.category}</h2>
            <GameGrid gamelist={gamelist} gameMobileLength={gamelist.length} gamePcLength={gamelist.length} adSlot={adConfig.zfx[0]} />
            <div className="bg-white shadow-md p-4 my-4">
              <AdComponent data-ad-slot={adConfig.hx} data-ad-format={"auto"} data-full-width-responsive={true} />

            </div>

            <div className="container my-4 mx-auto">
              {/* 玩过的游戏 */}
              <RecentlyPlayedSection />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

