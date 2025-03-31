"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { categoryList } from "../data/game"
import "@/public/icons/iconfont.css";  //引入css文件

export default function GameCategories() {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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

  const toggleCategories = () => {
    setIsOpen(!isOpen)
  }

  if (isMobile) {
    return (
      <div className="overflow-x-auto py-2 px-4 whitespace-nowrap">
        <button onClick={toggleCategories} className="nav-item">
          {/* <Gamepad2 className="w-5 h-5" /> */}
          <span>Categorias</span>
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 gap-2 mt-2"
          >
            {categoryList.map((category) => (
              <Link key={category.name} href={category.href} className="nav-item">
                <span>{category.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto py-2 px-4 whitespace-nowrap">
      <div className="flex space-x-1 justify-center">


        {categoryList.map((category) => {
          return (
            <Link key={category.name} href={category.href} className="nav-item pt-0.5 pb-0.5 flex text-sm pr-2 pl-2 xl:pr-3 xl:pl-3 xl:text-base rounded-lg hover:bg-white hover:text-[#1e3a8a]">
              <span className={`icon iconfont icon-${category.name} text-xl`}></span>
              <span>{category.name}</span>
            </Link>
          );
        })}


      </div>
    </div>
  )
}

