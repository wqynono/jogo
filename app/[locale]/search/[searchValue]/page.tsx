import { getTranslations } from "next-intl/server"
import GameGrid from "@/components/game-grid"
import AdComponent from "@/components/ad"
import { type Game, defaultGamelist } from "@/data/game"
import adConfig from "@/data/adConfig"
import RecentlyPlayedSection from "@/components/recently-played-section"
import { getSearchGames } from "@/api/game"

// 正确定义 params 类型
interface PageParams {
  locale: string
  searchValue: string
}

export default async function Search({
  params,
}: {
  params: Promise<PageParams>
}) {
  // 等待params解析完成
  const resolvedParams = await params
  const searchValue = resolvedParams.searchValue || ""

  // 使用服务器端翻译
  const t = await getTranslations("HomePage")

  // 在服务器端获取搜索结果
  let searchResults: Game[] = []
  let defaultGames: Game[] = []

  try {
    searchResults = await getSearchGames(searchValue)
    if (searchResults.length === 0) {
      defaultGames = defaultGamelist
    }
  } catch (error) {
    console.error("搜索失败:", error)
    defaultGames = defaultGamelist
  }

  return (
    <div>
      <div className="min-h-screen">
        <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12">
          <div className="mx-auto px-4 py-6">
            <h2 className="text-xl font-bold mb-4 font-sans">
              {searchResults.length > 0
                ? t("searchResultsFormat", { searchValue })
                : t("noResultsFormat", { searchValue })}
            </h2>

            {searchResults.length > 0 ? (
              <GameGrid
                gamelist={searchResults}
                gameMobileLength={searchResults.length}
                gamePcLength={searchResults.length}
                adSlot={adConfig.zfx[0]}
              />
            ) : (
              <GameGrid
                gamelist={defaultGames}
                gameMobileLength={defaultGames.length}
                gamePcLength={defaultGames.length}
                adSlot={adConfig.zfx[0]}
              />
            )}

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

