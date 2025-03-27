"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Car, Gamepad, Shirt } from "lucide-react"
import { Game } from '@/data/game'


type GameSlideProps = {
  name: string
  games: Game[]
  viewAllLink?: string
}

export default function GameSlide({ name, games, viewAllLink = "" }: GameSlideProps) {
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    const checkArrows = () => {
      if (!scrollContainerRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10) // 10px buffer
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkArrows)
      // Initial check
      checkArrows()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkArrows)
      }
    }
  }, [games])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const scrollAmount = isMobile ? 200 : 400
    const currentScroll = scrollContainerRef.current.scrollLeft

    scrollContainerRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative mb-8">
      {/* 标题和查看更多 */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href={viewAllLink}
          className="flex items-center gap-2 bg-white text-[#0B459C] px-3 py-1.5 rounded-lg hover:bg-[#0B459C] hover:text-white  transition-colors border-1"
        >
          <span className={`icon iconfont icon-${name} text-xl`}></span>
          <span className="font-bold">{name}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 左侧箭头 */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute  left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition-all cursor-pointer"
          style={{ marginTop: 20 }}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* 游戏列表 */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-3 pb-2 pt-2 hide-scrollbar "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {games.map((game) => (
          <Link
            key={`${game.id}`}
            href={`/game/${game.name}`}
            className="block flex-shrink-0 group hover:scale-105 transition-transform duration-300"
            style={{ width: isMobile ? "calc(40% - 8px)" : "146px" }}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={game.icon || "/placeholder.svg"}
                alt={game.name}
                width={146}
                height={146}
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
                <div className="absolute bottom-2 left-2 right-2 font-bold text-white text-sm line-clamp-2">
                  {game.name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 右侧箭头 */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition-all cursor-pointer"
          style={{ marginTop: 20 }}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* 添加样式以隐藏滚动条 */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

