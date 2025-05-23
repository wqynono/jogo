"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultGamelist, Game } from "@/data/game";
import AdComponent from "@/components/ad"; // 导入广告组件
import "@/css/game-grid.css"
import { useTranslations, useLocale } from "next-intl"
import adConfig from "@/data/adConfig"

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
  const locale = useLocale();

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


  // 定义广告插入的位置
  const adPosition = 4;

  // 截取需要展示的游戏列表
  const displayedGames = gamelist.slice(0, isMobile ? gameMobileLength : gamePcLength);
  console.log(gamePcLength)
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-11 gap-4 grid-flow-row">
      {displayedGames.map((game, index) => {
        const middleIndex = [0, 32] // 定义一个数组，用于存储大卡片的位置
        return (
          <React.Fragment key={String(game.id)}>
            {middleIndex.includes(index) && gamePcLength > 18 ? (
              <div className={`game-card  middle-game-card-${middleIndex.indexOf(index)} row-span-2 col-span-2`}>
                <Link href={`/${locale}/game/${game.name}`} className="block group w-full h-full">
                  <div className="relative aspect-square overflow-hidden rounded-lg w-full h-full">
                    <Image
                      src={game.icon || "/placeholder.svg"}
                      alt={game.sub_name || game.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={true} // 如果是LCP元素则标记为高优先级
                      loading="eager" // 禁用懒加载（对LCP元素很重要）
                      quality={40}   // 适当降低质量以提高加载速度
                      placeholder="blur" // 添加模糊占位符
                      blurDataURL="/placeholder.svg" // 小尺寸占位图像
                    />
                    <div className="game-card-title">{game.sub_name || game.name}</div>
                    {game.isfunny && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        Fun
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <>
                {/* 正常渲染游戏卡片 */}
                <div className="game-card">
                  <Link href={`/${locale}/game/${game.name}`} className="block group w-full h-full">
                    <div className="relative aspect-square overflow-hidden rounded-lg w-full h-full">
                      <Image
                        src={game.icon || "/placeholder.svg"}
                        alt={game.sub_name || game.name}
                        fill
                        sizes="(100vw - 16px) 100vw"
                        quality={70}
                        className="object-cover"
                      />
                      <div className="game-card-title">{game.sub_name || game.name}</div>
                      {game.isfunny && (
                        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                          Fun
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                {/* 在指定位置插入广告 */}
                {/* {index === adPosition && gamePcLength > 11 && (
                  <div
                    className={`bg-white row-start-4 col-start-1 row-span-3 col-span-3 max-h-[270px] border-1 border-gray-200 rounded-lg
                    sm:row-start-3 sm:col-start-1 sm:row-span-3 sm:col-span-4 
                    md:row-start-3 md:col-start-1 md:row-span-3 md:col-span-5
                    lg:row-start-2 lg:col-start-5 lg:row-span-2 lg:col-span-2
                  ${gamePcLength > 40 ? "xl:row-start-2 xl:col-start-7 xl:row-span-2 xl:col-span-2" : "xl:row-start-2 xl:col-start-2 xl:row-span-2 xl:col-span-2"}  
                  ${gamePcLength > 40 ? "2xl:row-start-3 2xl:col-start-10 2xl:row-span-2 2xl:col-span-2" : "2xl:row-start-1 2xl:col-start-10 2xl:row-span-2 2xl:col-span-2"}  
                    `}
                  >
                    <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1">
                      {t("advertisement")}</span>
                    <AdComponent data-ad-slot={adConfig.zfx[1]} data-ad-format={"auto"} data-full-width-responsive={true} />

                  </div>
                )} */}
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}