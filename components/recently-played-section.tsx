"use client"

import { useEffect, useState } from "react"
import type { Game } from "@/data/game"
import { getRecentlyPlayedGames } from "@/utils/recently-plyed"
import GameSlide from "@/components/game-slide"
import { useTranslations } from "next-intl"

export default function RecentlyPlayedSection() {
  const t = useTranslations("HomePage")
  const [recentGames, setRecentGames] = useState<Game[]>([])

  useEffect(() => {
    // 客户端渲染时获取最近玩过的游戏
    const games = getRecentlyPlayedGames()
    setRecentGames(games)
  }, [])

  if (recentGames.length === 0) {
    return null // 如果没有最近玩过的游戏，不显示此部分
  }

  return <GameSlide name={t("recentlyPlayed")} games={recentGames} />
}

