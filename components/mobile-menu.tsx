"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, HomeIcon as House, LayoutGrid, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { categoryList } from "../data/game"

type MobileMenuProps = {
  onClose: () => void
}

const pages = [
  { name: "home", icon: House, href: "/" },
  { name: "category", icon: LayoutGrid, href: "/category" },
  { name: "hotGame", icon: Sparkles, href: "/category/Strategy" },
]

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const t = useTranslations("Common")
  const menuT = useTranslations("MobileMenu")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Jogos 360 Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="font-bold text-xl text-white">JOGOS 360</div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="w-12 h-6 rounded-full bg-blue-800 flex items-center transition duration-300 focus:outline-none shadow"
            aria-label={isDarkMode ? menuT("lightMode") : menuT("darkMode")}
          >
            <div
              className={`w-6 h-6 relative rounded-full transition duration-500 transform ${isDarkMode ? "translate-x-6 bg-gray-700" : "translate-x-0 bg-white"
                } p-1 text-white`}
            ></div>
          </button>
          <button onClick={onClose} className="text-white" aria-label={t("close")}>
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {categoryList.map((category, index) => {
            return (
              <motion.div
                key={category.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={category.href}
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors duration-200 py-2"
                  onClick={onClose}
                >
                  <span className={`icon iconfont icon-${category.name} w-5 h-5`}></span>
                  <span>{category.name}</span>
                </Link>
              </motion.div>
            )
          })}

          <div className="border-t border-blue-800 pt-4 mt-4">
            {pages.map((page, index) => (
              <motion.div
                key={page.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (categoryList.length + index) * 0.05 }}
              >
                <Link
                  href={page.href}
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors duration-200 py-2"
                  onClick={onClose}
                >
                  <page.icon className="w-5 h-5" />
                  <span>{t(page.name)}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

