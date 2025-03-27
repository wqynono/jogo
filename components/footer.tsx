"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTranslations } from "next-intl"

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ru", name: "Русский" },
  { code: "fr", name: "Français" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "pl", name: "Polski" },
  { code: "el", name: "Ελληνικά" },
  { code: "tr", name: "Türkçe" },
  { code: "de", name: "Deutsch" },
  { code: "id", name: "Indonesia" },
  { code: "pt", name: "Português" },
  { code: "es", name: "Español" },
]

export default function Footer() {
  const t = useTranslations("Footer")
  const homeT = useTranslations("HomePage")
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isMobile, setIsMobile] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)

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

  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen)
  }

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  // 点击外部关闭语言选择器
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <footer>
      <div className="container mx-auto p-10 border border-gray-200 bg-white rounded-xl mb-8">
        <div className="text-gray-700 text-sm leading-relaxed space-y-6">
          {/* 只在桌面端显示的内容 */}
          {!isMobile && (
            <>
              <p>{homeT("catalogDesc")}</p>

              <p>
                {homeT("popularGamesDesc")}{" "}
                <Link href="/jogo/fireboy-and-watergirl" className="text-blue-600 hover:underline">
                  Fireboy and Watergirl
                </Link>
                ,{" "}
                <Link href="/jogo/moto-x3m" className="text-blue-600 hover:underline">
                  Moto X3M
                </Link>
                ,{" "}
                <Link href="/jogo/penalty-shooters-2" className="text-blue-600 hover:underline">
                  Penalty Shooters 2
                </Link>
                ,{" "}
                <Link href="/jogo/bad-ice-cream" className="text-blue-600 hover:underline">
                  Bad Ice Cream
                </Link>
                ,{" "}
                <Link href="/jogo/bubble-shooter" className="text-blue-600 hover:underline">
                  Bubble Shooter
                </Link>
                , {homeT("andMore")}{" "}
                <Link href="/jogo/tic-tac-toe" className="text-blue-600 hover:underline">
                  Tic-Tac-Toe
                </Link>
                ,{" "}
                <Link href="/jogo/pac-man" className="text-blue-600 hover:underline">
                  Pac-Man
                </Link>
                ,{" "}
                <Link href="/jogo/solitaire" className="text-blue-600 hover:underline">
                  Solitaire
                </Link>
                ,{" "}
                <Link href="/jogo/2048" className="text-blue-600 hover:underline">
                  2048
                </Link>
                ,{" "}
                <Link href="/jogo/dino-chrome" className="text-blue-600 hover:underline">
                  Dino Chrome
                </Link>
                , and more.
              </p>
            </>
          )}

          {/* 游戏分类 - 桌面端和移动端都显示 */}
          <div>
            {!isMobile && <h2 className="text-xl font-bold text-gray-800 mb-4">{homeT("findFavoriteGames")}</h2>}
            <p className="mb-4">{homeT("gamesOrganized")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <Link href="/categoria/2-jogadores" className="text-blue-600 hover:underline">
                  {homeT("twoPlayerGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/old-friv" className="text-blue-600 hover:underline">
                  {homeT("oldFrivGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/carros" className="text-blue-600 hover:underline">
                  {homeT("carGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/tiro" className="text-blue-600 hover:underline">
                  {homeT("shootingGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/futebol" className="text-blue-600 hover:underline">
                  {homeT("soccerGames")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 关于网站 */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{homeT("aboutBlipzi")}</h2>
            <p className="mb-4">{homeT("aboutBlipziDesc1")}</p>
            <p className="mb-4">{homeT("aboutBlipziDesc2")}</p>
          </div>

          {/* 语言选择 */}
          <div>
            <h3 className="font-bold mb-2">{t("preferLanguage")}</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                {t("playFreeOn")}{" "}
                <Link href="https://jogos360.com" className="text-blue-600 hover:underline">
                  Jogos 360
                </Link>
              </li>
              <li>
                {t("playFreeOn")}{" "}
                <Link href="https://juegosarea.com" className="text-blue-600 hover:underline">
                  JuegosArea
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 黑色页脚 */}
      <div className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* 移动端布局 */}
          {isMobile ? (
            <div className="flex flex-col">
              {/* 导航链接 - 移动端两列布局 */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                <div>
                  <Link href="/top-jogos" className="block hover:text-white transition-colors">
                    {t("topGames")}
                  </Link>
                </div>
                <div>
                  <Link href="/privacidade" className="block hover:text-white transition-colors">
                    {t("privacyPolicy")}
                  </Link>
                </div>
                <div>
                  <Link href="/novos-jogos" className="block hover:text-white transition-colors">
                    {t("newGames")}
                  </Link>
                </div>
                <div>
                  <Link href="/contato" className="block hover:text-white transition-colors">
                    {t("contact")}
                  </Link>
                </div>
                <div>
                  <Link href="/categorias" className="block hover:text-white transition-colors">
                    {t("categories")}
                  </Link>
                </div>
                <div>
                  <Link href="/anuncie" className="block hover:text-white transition-colors">
                    {t("advertise")}
                  </Link>
                </div>
                <div>
                  <Link href="/sobre" className="block hover:text-white transition-colors">
                    {t("aboutUs")}
                  </Link>
                </div>
              </div>

              {/* 版权信息和语言选择器 */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="flex items-center text-sm">
                    {t("copyright")}
                    <span className="ml-2">
                      <Image
                        src="/placeholder.svg?height=16&width=60&text=7GRAUS"
                        alt="7GRAUS"
                        width={60}
                        height={16}
                        className="inline-block"
                      />
                    </span>
                  </p>
                </div>

                {/* 语言选择器 */}
                <div className="relative" ref={languageMenuRef}>
                  <button
                    onClick={toggleLanguageMenu}
                    className="flex items-center justify-between w-32 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors"
                  >
                    <span>{selectedLanguage}</span>
                    {isLanguageOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isLanguageOpen && (
                    <div className="absolute right-0 bottom-full mb-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-1 max-h-60 overflow-y-auto">
                        {languages.map((language) => (
                          <li key={language.code}>
                            <button
                              onClick={() => selectLanguage(language.name)}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedLanguage === language.name ? "font-bold" : ""
                                }`}
                            >
                              {language.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* 中间导航链接 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-0">
                <div>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/top-jogos" className="hover:text-white transition-colors">
                        {t("topGames")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/novos-jogos" className="hover:text-white transition-colors">
                        {t("newGames")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/categorias" className="hover:text-white transition-colors">
                        {t("categories")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/sobre" className="hover:text-white transition-colors">
                        {t("aboutUs")}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/privacidade" className="hover:text-white transition-colors">
                        {t("privacyPolicy")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/contato" className="hover:text-white transition-colors">
                        {t("contact")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/anuncie" className="hover:text-white transition-colors">
                        {t("advertise")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="my-8 border-gray-700" />
              {/* 桌面端布局 */}
              <div className="flex flex-col md:flex-row justify-between">
                {/* 左侧版权信息 */}
                <div className="mb-6 md:mb-0">
                  <p className="flex items-center">
                    {t("copyright")}
                    <span className="ml-2">
                      {/* <Image
                        src="/placeholder.svg?height=20&width=80&text=7GRAUS"
                        alt="7GRAUS"
                        width={80}
                        height={20}
                        className="inline-block"
                      /> */}
                    </span>
                  </p>
                </div>

                {/* 右侧语言选择器 */}
                <div className="relative" ref={languageMenuRef}>
                  <button
                    onClick={toggleLanguageMenu}
                    className="flex items-center justify-between w-40 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors"
                  >
                    <span>{selectedLanguage}</span>
                    {isLanguageOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isLanguageOpen && (
                    <div className="absolute right-0 bottom-full mb-1 w-40 text-black bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-1 max-h-60 overflow-y-auto">
                        {languages.map((language) => (
                          <li key={language.code}>
                            <button
                              onClick={() => selectLanguage(language.name)}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedLanguage === language.name ? "font-bold" : ""
                                }`}
                            >
                              {language.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

