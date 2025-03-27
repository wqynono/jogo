"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Heart, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { getRecentlyPlayedGames } from "@/utils/recently-plyed"
import { getLikedGames } from "@/utils/like-game"
import type { Game } from "@/data/game"


type MyGamesModalProps = {
  onClose: () => void
}

export default function MyGamesModal({ onClose }: MyGamesModalProps) {
  const t = useTranslations("HomePage")
  const commonT = useTranslations("Common")
  const [activeTab, setActiveTab] = useState<"favorites" | "recent">("favorites")
  const [recentGames, setRecentGames] = useState<Game[]>([])
  const [likedGames, setLikedGames] = useState<Game[]>([])

  useEffect(() => {
    const recentGames = getRecentlyPlayedGames()
    setRecentGames(recentGames)

    const likedGames = getLikedGames()
    setLikedGames(likedGames)
  }, [])
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 relative">
        <h2 className="font-bold text-center">{t("myGames")}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
          aria-label={commonT("close")}
        >
          <X className="w-6 h-6 cursor-pointer" />
        </button>
      </div>

      <div className="flex relative">
        <button
          className={`cursor-pointer flex-1 py-3 px-4 font-medium flex items-center justify-center gap-2 ${activeTab === "favorites" ? "text-green-600" : "text-gray-500"
            }`}
          onClick={() => setActiveTab("favorites")}
        >
          <Heart className={`w-5 h-5 ${activeTab === "favorites" ? "fill-green-600 stroke-green-600" : ""}`} />
          {t("favorites")}
        </button>
        <button
          className={`cursor-pointer flex-1 py-3 px-4 font-medium flex items-center justify-center gap-2 ${activeTab === "recent" ? "text-green-600" : "text-gray-500"
            }`}
          onClick={() => setActiveTab("recent")}
        >
          <Clock className="w-5 h-5" />
          {t("recent")}
        </button>
        <motion.div
          className="absolute bottom-0 h-1 bg-green-500 rounded-full"
          initial={false}
          animate={{
            left: activeTab === "favorites" ? "12.5%" : "62.5%",
            width: "25%",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>

      <div className="m-4 h-full  overflow-y-scroll">
        <div className="grid grid-cols-3 gap-2 h-full">
          {activeTab === "favorites" && likedGames.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-2 stroke-gray-300" />
              <p>{t("noFavorites")}</p>
            </div>
          )}

          {activeTab === "recent" && recentGames.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-2 stroke-gray-300" />
              <p>{t("noRecentGames")}</p>
            </div>
          )}

          {activeTab === "favorites" &&
            likedGames.map((game) => (
              <Link key={`${game.id}`} href={`/game/${game.name}`} className="block group" onClick={onClose}>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={game.icon || ""}
                    alt={game.name || ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100">
                    <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
                      {game.name || ""}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          {activeTab === "recent" &&
            recentGames.map((game) => (
              <Link key={`${game.id}`} href={`/game/${game.name}`} className="block group" onClick={onClose}>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={game.icon || ""}
                    alt={game.name || ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100">
                    <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
                      {game.name || ""}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

