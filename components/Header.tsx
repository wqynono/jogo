"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import SearchModal from "./search-modal"
import MobileMenu from "./mobile-menu"
import MyGamesModal from "./my-games-modal"
import GameCategories from "./game-categories"

export default function Header() {
  const t = useTranslations("HomePage")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMyGamesOpen, setIsMyGamesOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLDivElement>(null)
  const searchBoxRef = useRef<HTMLInputElement>(null)
  // 添加移动端搜索输入框引用
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)

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

  // 切换搜索框的显示状态
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
    if (isMyGamesOpen) setIsMyGamesOpen(false)

    // 根据设备类型聚焦到不同的搜索框
    if (!isSearchOpen) {
      setSearchQuery("")

      setTimeout(() => {
        if (isMobile && mobileSearchInputRef.current) {
          mobileSearchInputRef.current.focus()
        } else if (searchBoxRef.current) {
          searchBoxRef.current.focus()
        }
      }, 300) // 增加延迟，等待动画完成
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
    if (isMyGamesOpen) setIsMyGamesOpen(false)
  }

  const toggleMyGames = () => {
    setIsMyGamesOpen(!isMyGamesOpen)
    if (isSearchOpen) setIsSearchOpen(false)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (!isSearchOpen) {
      setIsSearchOpen(true)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    // 根据设备类型聚焦到不同的搜索框
    if (isMobile && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus()
    } else if (searchBoxRef.current) {
      searchBoxRef.current.focus()
    }
  }

  return (
    <>
      <header className={`w-full relative ${isMobile && isSearchOpen ? "z-40" : "z-auto"}`}>
        {/* 顶部导航栏 */}
        <div className={`bg-gray-100 border-b border-gray-200 ${isMobile && isSearchOpen ? "h-[64px]" : "h-auto"}`}>
          <div
            className={`container  mx-auto px-4 py-3 flex items-center justify-between  ${isMobile && isSearchOpen ? "fixed top-0 left-0 w-full z-40 bg-white" : "z-auto"}`}
          >
            <div className={`${isMobile && isSearchOpen ? "hidden" : "block"} `}>
              <Link href="/" className="flex items-center">
                <div className="relative w-12 mr-2 h-10">
                  <Image
                    src="../../public/logo.svg"
                    alt="Jogos 360"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="font-bold">JOGOS360</div>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/category/Top" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
                {t("topGames")}
              </Link>
              <span className="text-gray-400">•</span>

              <button
                onClick={toggleMyGames}
                className="bg-[#5f9915] hover:bg-[#427100] cursor-pointer text-white font-medium py-1.5 px-4 rounded-md transition-colors duration-200 flex items-center"
              >
                <Heart className="w-4 h-4 mr-1" />
                {t("myGames")}
              </button>

              {/* 桌面端搜索输入框 */}
              <div className="relative z-40">
                <div className="relative">
                  {/* 桌面端搜索模态框 */}
                  <SearchModal
                    onClose={toggleSearch}
                    isOpen={isSearchOpen}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />

                  <input
                    ref={searchBoxRef}
                    type="text"
                    placeholder={t("searchGames")}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onClick={() => !isSearchOpen && toggleSearch()}
                    className="bg-gray-100 border border-gray-300 rounded-full py-1.5 pl-4 pr-10 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  <Link
                    href={`${searchQuery ? `/search/${encodeURIComponent(searchQuery)}` : "#"}`}
                    className="absolute right-0 top-0 h-full px-3 flex items-center justify-center bg-[#5f9915] rounded-r-full"
                  >
                    <Search className="w-5 h-5 text-white" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <motion.div
                initial={false}
                animate={isSearchOpen ? "open" : "closed"}
                variants={{
                  open: { width: "calc(100vw - 80px)", opacity: 1 },
                  closed: { width: 0, opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder={t("searchGames")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-10 bg-gray-100 border border-gray-300 rounded-full py-1.5 pl-4 pr-10 focus:outline-none  focus:border-transparent"
                />
              </motion.div>

              <button onClick={toggleSearch} className="p-2 rounded-full bg-green-600 text-white flex-shrink-0">
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMyGames}
                className={`${isSearchOpen && isSearchOpen ? "hidden" : "inline-block"} p-2 rounded-full bg-green-600 text-white flex-shrink-0`}
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={toggleMobileMenu}
                className={`${isSearchOpen && isSearchOpen ? "hidden" : "inline-block"} p-2 rounded-full bg-green-600 text-white flex-shrink-0`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 游戏分类导航 */}
        <div className="bg-[#1e3a8a] text-white">
          <div className="mx-auto hidden lg:block">
            <GameCategories />
          </div>
        </div>
      </header>

      {/* 搜索遮罩层 */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30"
            onClick={toggleSearch}
          />
        )}
      </AnimatePresence>

      {/* 移动端搜索界面 */}
      <AnimatePresence>
        {isSearchOpen && isMobile && (
          <>
            {/* 移动端搜索结果 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              ref={searchInputRef}
              className="fixed top-0 left-0 right-0 bg-white z-40 max-h-[70vh] overflow-y-auto rounded-b-lg shadow-lg"
            >
              <SearchModal
                isOpen={true}
                onClose={toggleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed inset-0 z-50 bg-[#1e3a8a]"
          >
            <MobileMenu onClose={toggleMobileMenu} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 我的游戏弹窗 */}
      <AnimatePresence>
        {isMyGamesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMyGames}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="fixed top-0 right-0 h-full w-80 max-w-lg z-50 bg-white shadow-xl"
            >
              <MyGamesModal onClose={toggleMyGames} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

