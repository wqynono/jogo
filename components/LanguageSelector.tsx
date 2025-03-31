"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

const languages = [
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "ru", name: "Русский" }
]

export default function LanguageSelector() {
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // 获取当前语言
    const currentLocale = pathname.split('/')[1] || 'en'
    const currentLanguage = languages.find(lang => lang.code === currentLocale)?.name || 'English'

    // 切换语言
    const selectLanguage = (languageCode: string) => {
        const segments = pathname.split('/')
        if (languages.some(lang => lang.code === segments[1])) {
            segments[1] = languageCode // 替换当前语言
        } else {
            segments.splice(1, 0, languageCode) // 插入新语言
        }
        router.push(segments.join('/'))
        setIsOpen(false)
    }

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
                                <button
                                    onClick={() => selectLanguage(language.code)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-black ${currentLocale === language.code ? "font-bold" : ""
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
    )
}