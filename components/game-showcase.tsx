"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { addRecentlyPlayedGame } from '@/utils/recently-plyed'
import { addLikedGame, removeLikedGame, isGameLiked } from '@/utils/like-game'
import { Game } from "@/data/game"
import { useTranslations } from "next-intl"
export default function GameShowcase({ game = {} as Game }: { game?: Game }) {
  const t = useTranslations("HomePage")
  const [showGame, setShowGame] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(17)
  const [dislikeCount, setDislikeCount] = useState(7)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  // 检测是否为移动设备
  useEffect(() => {
    setLiked(isGameLiked(game))
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初始检测
    checkIfMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkIfMobile)

    // 清理监听器
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])



  const playGame = () => {
    setShowGame(true)
    addRecentlyPlayedGame(game)
  }

  // 点赞函数
  const likeFn = () => {
    if (liked) {
      setLiked(false)
      setLikeCount((prev) => prev - 1)
      removeLikedGame(game)
    } else {
      setLiked(true)
      setLikeCount((prev) => prev + 1)
      addLikedGame(game)
      if (disliked) {
        setDisliked(false)
        setDislikeCount((prev) => prev - 1)
      }
    }
  }

  // 点踩函数
  const dislikeFn = () => {
    if (disliked) {
      setDisliked(false)
      setDislikeCount((prev) => prev - 1)
    } else {
      setDisliked(true)
      setDislikeCount((prev) => prev + 1)
      removeLikedGame(game)
      if (liked) {
        setLiked(false)
        setLikeCount((prev) => prev - 1)
      }
    }
  }

  return (
    <div className="relative w-full h-full">

      {/* 游戏背景图片 */}
      <div className="absolute inset-0 z-[1] opacity-40 ">
        <Image
          src={game.icon}
          alt={game.name}
          fill
          className="object-cover object-center "
          priority
        />
      </div>

      {/* 蒙版层 */}
      <div className="absolute inset-0 bg-black/60 z-[2] " />

      {/* 内容容器 */}
      <div className="absolute flex flex-col items-center justify-center w-full h-full z-10  overflow-hidden">
        <AnimatePresence mode="wait">
          {!showGame ? (
            <motion.div
              key="game-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center "
            >
              {/* 游戏图标 */}
              <div className="mb-4 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src={game.icon}
                  alt={game.name}
                  width={isMobile ? 100 : 150}
                  height={isMobile ? 100 : 150}
                  className="object-cover "
                />
              </div>

              {/* 播放按钮 */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-black font-bold py-2 px-12 rounded-full text-xl tracking-wider shadow-lg cursor-pointer"
                onClick={playGame}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {t("play")}
              </motion.button>
            </motion.div>
          ) : (
            // <GameFrame onClose={() => setShowGame(false)} isMobile={isMobile} />
            !isMobile ? (// 如果不是移动设备，则显示游戏iframe
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden pb-[68px]"
              >
                <iframe
                  ref={iframeRef}
                  src={game.html}
                  title={game.name}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </motion.div>
            ) : (
              // 如果是移动设备，则显示全屏游戏
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[100]"
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <div className="relative w-full h-full">
                  {/* 游戏iframe - 确保没有覆盖层 */}
                  <iframe
                    ref={iframeRef}
                    src={game.html}
                    title={game.name}
                    className="absolute inset-0 w-full h-full border-0 z-[100]"
                    allowFullScreen
                    style={{
                      pointerEvents: "auto",
                      touchAction: "auto",
                    }}
                  />

                  {/* 返回按钮 - 左上角 - 确保z-index高于iframe */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowGame(false)}
                    className="absolute top-4 left-4 bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center z-[102]"
                    aria-label="返回"
                    style={{ touchAction: "manipulation" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5"></path>
                      <path d="M12 19l-7-7 7-7"></path>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )

          )}
        </AnimatePresence>


        {/* 底部控制栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute z-10 lg:z-10 bottom-0 left-0 right-0 bg-white flex gap-[4px] flex-col lg:flex-row items-center p-2  "
        >
          <div className="flex items-center">
            <Image
              src={game.icon}
              alt={game.name}
              width={40}
              height={40}
              className="mr-2 hidden lg:block rounded-sm"
            />
            <span className="text-black font-medium">Geometry Rush 4D</span>
          </div>
          <div className="m-0 lg:ml-auto flex items-center space-x-4">

            {/* 点赞 */}
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center"
                onClick={likeFn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`mr-1 ${liked ? "text-blue-500" : "text-gray-700"}`}
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span className={liked ? "text-blue-500 font-medium" : "text-gray-700"}>{likeCount}</span>
              </motion.button>
            </div>

            {/* 不喜欢 */}
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center"
                onClick={dislikeFn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={disliked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`mr-1 ${disliked ? "text-red-500" : "text-gray-700"}`}
                >
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                </svg>
                <span className={disliked ? "text-red-500 font-medium" : "text-gray-700"}>{dislikeCount}</span>
              </motion.button>
            </div>

            {/* 评论 */}
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </motion.button> */}

            {/* 全屏 */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden lg:flex items-center text-gray-700"
              onClick={() => {
                if (iframeRef.current) {
                  iframeRef.current.requestFullscreen()
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

