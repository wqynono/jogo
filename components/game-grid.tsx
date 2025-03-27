"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultGamelist, Game } from "@/data/game";
import AdComponent from "@/components/ad"; // 导入广告组件
import "@/css/game-grid.css"
import { useTranslations } from "next-intl"
export default function GameGrid({
  gamelist = defaultGamelist, // 默认值
  gamePcLength = 49, // 默认值
  gameMobileLength = 24, // 默认值
  adSlot = "11111111", // 默认值
}: {
  gamelist?: Game[]; // 类型声明
  gamePcLength?: number;
  gameMobileLength?: number;
  adSlot?: string;
}) {
  const t = useTranslations("HomePage")
  // 定义一个状态变量，用于判断是否为移动设备
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // 定义广告插入的位置
  const adPosition = 4;

  // 截取需要展示的游戏列表
  const displayedGames = gamelist.slice(0, isMobile ? gameMobileLength : gamePcLength);
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-11 gap-4 grid-flow-row">
      {displayedGames.map((game, index) => {
        const middleIndex = [0, 32] // 定义一个数组，用于存储大卡片的位置
        return (
          <React.Fragment key={String(game.id)}>
            {/* 当 index == 6 时，只渲染特殊元素 */}
            {middleIndex.includes(index) && gamePcLength > 18 ? (
              <div className={`game-card  middle-game-card-${middleIndex.indexOf(index)} row-span-2 col-span-2`}>
                <Link href={`/game/${game.name}`} className="block group w-full h-full">
                  <div className="relative aspect-square overflow-hidden rounded-lg w-full h-full">
                    <Image
                      src={game.icon || "/placeholder.svg"}
                      alt={game.name}
                      fill
                      sizes="(100vw - 16px) 100vw"
                      className="object-cover"
                    />
                    <div className="game-card-title">{game.name}</div>
                    {game.isfunny && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {index}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <>
                {/* 正常渲染游戏卡片 */}
                <div className="game-card">
                  <Link href={`/game/${game.name}`} className="block group w-full h-full">
                    <div className="relative aspect-square overflow-hidden rounded-lg w-full h-full">
                      <Image
                        src={game.icon || "/placeholder.svg"}
                        alt={game.name}
                        fill
                        sizes="(100vw - 16px) 100vw"
                        className="object-cover"
                      />
                      <div className="game-card-title">{game.name}</div>
                      {game.isfunny && (
                        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                          {index}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                {/* 在指定位置插入广告 */}
                {index === adPosition && (
                  <div
                    className={`bg-white row-start-4 col-start-1 row-span-3 col-span-3  
                    sm:row-start-3 sm:col-start-1 sm:row-span-3 sm:col-span-4 
                    md:row-start-3 md:col-start-1 md:row-span-3 md:col-span-5
                    lg:row-start-2 lg:col-start-5 lg:row-span-2 lg:col-span-2
                  ${gamePcLength > 40 ? "xl:row-start-2 xl:col-start-7 xl:row-span-2 xl:col-span-2" : "xl:row-start-2 xl:col-start-2 xl:row-span-2 xl:col-span-2"}  
                  ${gamePcLength > 40 ? "2xl:row-start-3 2xl:col-start-10 2xl:row-span-2 2xl:col-span-2" : "2xl:row-start-1 2xl:col-start-10 2xl:row-span-2 2xl:col-span-2"}  
                    `}
                  >
                    <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1">   {t("advertisement")}</span>
                    <AdComponent adSlot={adSlot} />
                  </div>
                )}
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}