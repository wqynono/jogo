"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
const languages = [
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "ru", name: "Русский" }
]

export default function LanguageSelector() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // 获取当前语言
    const currentLocale = pathname.split('/')[1] || 'en'
    const currentLanguage = languages.find(lang => lang.code === currentLocale)?.name || 'English'

    // 点击外部关闭菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-32 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors"
            >
                <span>{currentLanguage}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-1 max-h-60 overflow-y-auto">
                        {languages.map((language) => (
                            <li key={language.code}>
                                <Link
                                    href={`/${language.code}/top`} // 根据你的路由结构调整
                                    className={`w-full block px-4 py-2 text-sm hover:bg-gray-100 text-black ${currentLocale === language.code ? "font-bold" : ""
                                        }`}
                                    onClick={() => setIsOpen(false)} // 关闭下拉菜单
                                >
                                    {language.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}