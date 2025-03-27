
import { getTranslations } from 'next-intl/server';
import AdComponent from "@/components/ad"
import { actionGames, puzzleGames, sportsGames, racingGames, Game, defaultGamelist } from "@/data/game"
import GameSlide from "@/components/game-slide"
import adConfig from "@/data/adConfig"
import React from "react"
import Link from "next/link";
import Image from "next/image"
import "@/css/game-player.css"
import GameShowcase from "@/components/game-showcase";
import RecentlyPlayedSection from "@/components/recently-played-section"


export default async function Name({ params }: any) {
  const t = await getTranslations("HomePage")
  const { game } = params;
  const gameDeail: Game | {} = defaultGamelist.find((item) => item.name === game) || {}
  return (
    <div>
      <div className="min-h-screen">
        <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
          <div className="mx-auto px-4 py-6">

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-11 gap-4 grid-flow-row">
              {actionGames.map((game, index) => {

                return (
                  <React.Fragment key={String(game.id)}>
                    {/* 正常渲染游戏卡片 */}
                    <div className="game-card">
                      <Link href={`/game/${game.name}`} className="block group w-full h-full">
                        <div className="relative aspect-square overflow-hidden rounded-lg w-full h-full">
                          <Image
                            src={game.icon || "/placeholder.svg"}
                            alt={game.name}
                            fill
                            sizes="(100vw - 16px) 100vw"
                            className="object-cover"
                          />
                          <div className="game-card-title">{game.name}</div>
                          {game.isfunny && (
                            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                              {index}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* 游戏位置 */}
              <div className={`col-start-1 col-end-4 row-start-1 row-end-4 min-h-[320]  shadow-lg  rounded-lg overflow-hidden
                      sm:col-start-1 sm:col-end-5 sm:row-start-1 sm:row-end-4  sm:min-h-[360]
                      md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-5 md:min-h-[440]
                      lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-4 lg:min-h-[440]
                      xl:col-start-1 xl:col-end-7 xl:row-start-1 xl:row-end-5 xl:min-h-[550]
                      2xl:col-start-3 2xl:col-end-9 2xl:row-start-1 2xl:row-end-5 2xl:min-h-[440]`}>
                <GameShowcase game={gameDeail as Game} />

              </div>

              {/* 广告位置右侧 */}
              <div className={`bg-white col-start-1 col-end-4 row-start-5 row-end-8 min-h-[350] shadow-lg rounded-lg
                      sm:col-start-1 sm:col-end-5 sm:row-start-5 sm:row-end-8  sm:min-h-[360]
                      md:col-start-1 md:col-end-6 md:row-start-6 md:row-end-9 md:min-h-[440]
                      lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-4 lg:min-h-[440]
                      xl:col-start-7 xl:col-end-9 xl:row-start-1 xl:row-end-5 xl:min-h-[550]
                      2xl:col-start-9 2xl:col-end-12 2xl:row-start-1 2xl:row-end-5 2xl:min-h-[440]`}>
                <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1 rounded-t-lg">{t("advertisement")}</span>

                <AdComponent />
              </div>

              {/* 广告位置底部 */}
              <div className={`bg-white min-h-[100] col-start-1 col-end-[-1] shadow-lg rounded-lg
                      lg:col-start-1 lg:col-end-5 lg:row-start-4 lg:row-end-5
                      xl:col-start-1 xl:col-end-7 xl:row-start-5 xl:row-end-6
                      2xl:col-start-3 2xl:col-end-9 2xl:row-start-5 2xl:row-end-6`}>
                <AdComponent height={100} />
                <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1 rounded-b-lg">{t("advertisement")}</span>
              </div>


              {/* 玩过的游戏 */}
              <div className="col-start-1 col-end-[-1]">
                <RecentlyPlayedSection />
              </div>

              {/* 游戏介绍 */}
              <div className="col-start-1 col-end-[-1] bg-white rounded-lg overflow-hidden shadow-md">
                {/* 游戏头部区域 */}
                <div className="relative h-24 sm:h-30 bg-black overflow-hidden">
                  <div
                    className="absolute right-0 top-0 bottom-0 w-[40%] overflow-hidden"
                    style={{
                      maskImage: "linear-gradient(to right, transparent, black 30%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
                    }}
                  >
                    <Image src={(gameDeail as Game).icon || ""} alt={(gameDeail as Game).name || ""} fill className="object-cover" priority />
                  </div>

                  {/* 整体遮罩层 */}
                  <div className="absolute inset-0 bg-black/40 z-[1]"></div>

                  {/* 游戏标题和副标题 */}
                  <div className="relative z-10 h-full flex flex-col justify-center p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-lime-400">{(gameDeail as Game).name || ""}</h1>
                    <p className="text-sm sm:text-base text-white mt-1">{(gameDeail as Game).category || ""}</p>
                  </div>
                </div>

                {/* 游戏描述 */}
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{t("gameIntro")}</h2>
                  <p className="text-sm sm:text-base text-gray-700 mb-4">{(gameDeail as Game).desc_text || ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

