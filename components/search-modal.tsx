"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { History, TrendingUp, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { type Game, defaultGamelist } from "@/data/game"
import { getRecentlyPlayedGames } from "@/utils/recently-plyed"
import { getSearchGames } from "@/api/game"
import Skeleton from "@/components/Skeleton"

type SearchModalProps = {
  onClose: () => void
  isOpen: boolean
  searchQuery: string | undefined
  setSearchQuery?: (query: string) => void
}

export default function SearchModal({ onClose, isOpen, searchQuery, setSearchQuery }: SearchModalProps) {
  const t = useTranslations("HomePage")
  const searchT = useTranslations("Search")
  const commonT = useTranslations("Common")

  const [isMobile, setIsMobile] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [recentGames, setRecentGames] = useState<Game[]>([])
  const [popularGames, setPopularGames] = useState<Game[]>([])
  const [searchResults, setSearchResults] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 获取搜索结果
  useEffect(() => {
    // 如果搜索词长度大于等于3，则调用搜索接口
    if (searchQuery && searchQuery.length >= 3) {
      setIsLoading(true)
      getSearchGames(searchQuery)
        .then((data) => {
          setSearchResults(data)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      // 清空搜索结果
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    // 客户端渲染时获取最近玩过的游戏
    const games = getRecentlyPlayedGames()
    setRecentGames(games)

    // 设置本周流行游戏
    setPopularGames([...defaultGamelist])

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])


  // 如果不是打开状态，不渲染任何内容
  if (!isOpen) return null

  return (
    <>
      {/* 搜索结果区域 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        ref={modalRef}
        className={`
          bg-white shadow-xl overflow-y-auto z-40 rounded-b-2xl
          ${isMobile
            ? "fixed inset-x-0 top-[64px] bottom-0 h-auto max-h-fit"
            : "absolute max-h-[calc(100vh-180px)] top-[calc(100%+10px)] w-full "
          }
        `}
      >
        <div className="p-4">
          {/* 搜索结果 */}
          {searchQuery && searchQuery.length >= 3 && (
            <div className="my-4">
              {isLoading ? (
                // 加载中显示骨架屏
                <Skeleton />
              ) : searchResults.length > 0 ? (
                // 有搜索结果时显示结果
                <>
                  <div className="grid grid-cols-4 lg:grid-cols-3 gap-2 grid-flow-row">
                    {searchResults.slice(0, 12).map((game) => (
                      <div key={game.name} className="game-card">
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
                                Fun
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* 查看更多结果按钮 */}
                  <div className="mt-4 flex justify-center">
                    <Link
                      href={`/search/${encodeURIComponent(searchQuery)}`}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full text-center w-full max-w-xs"
                      onClick={onClose}
                    >
                      {commonT("viewMore")} "{searchQuery}" {t("searchResults")}
                    </Link>
                  </div>
                </>
              ) : (
                // 无搜索结果时显示提示
                <div className="text-center py-6 text-gray-500">
                  {searchT("noResults")} "{searchQuery}"
                </div>
              )}
            </div>
          )}

          {/* 当没有搜索或搜索词长度小于3时，显示默认内容 */}
          {(!searchQuery || searchQuery.length < 3) && (
            <>
              {/* 最近玩过 */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <History className="w-5 h-5 mr-2 text-gray-600" />
                  <h3 className="text-sm font-medium">{t("recentlyPlayed")}</h3>
                </div>
                <div className="grid grid-cols-4 lg:grid-cols-3 gap-2 grid-flow-row">
                  {recentGames.slice(0, 6).map((game) => (
                    <div key={game.name} className="game-card">
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
                              Fun
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* 本周流行 */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 mr-2 text-gray-600" />
                  <h3 className="text-sm font-medium">{commonT("thisWeekPopular")}</h3>
                </div>
                <div className="grid grid-cols-4 lg:grid-cols-3 gap-2 grid-flow-row">
                  {popularGames.slice(0, 6).map((game) => (
                    <div key={game.name} className="game-card">
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
                              Fun
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* 推荐分类 */}
              <div>
                <div className="flex items-center mb-3">
                  <ThumbsUp className="w-5 h-5 mr-2 text-gray-600" />
                  <h3 className="text-sm font-medium">{t("youMightLike")}</h3>
                </div>
                <div className="space-y-2">
                  {defaultGamelist.slice(0, 1).map((game) => (
                    <Link
                      key={game.name}
                      href={`/category/${game.category}`}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      onClick={onClose}
                    >
                      <Image
                        src={game.icon || "/placeholder.svg"}
                        alt={game.name}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-sm">{game.category}</div>
                        <div className="text-xs text-gray-500">{game.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}

