
import { getTranslations } from 'next-intl/server';
import GameGrid from "@/components/game-grid"
import AdComponent from "@/components/ad" // 导入广告组件
import { defaultGamelist, categoryList } from "@/data/game"
import { actionGames, puzzleGames, sportsGames, racingGames } from "@/data/game"
import React from "react"
import GameSlide from "@/components/game-slide"
import adConfig from "@/data/adConfig"
export default async function Category() {
    const t = await getTranslations('HomePage');


    return (
        <div>
            <div className="min-h-screen">
                <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
                    <div className="mx-auto px-4 py-6">

                        <div className="bg-white shadow-md p-4 my-4">
                            <AdComponent data-ad-slot={"222222"} data-ad-format={"auto"} data-full-width-responsive={true} />

                        </div>

                        <div className="container my-4 mx-auto">
                            {categoryList.map((category) => (
                                <GameSlide key={category.name} name={category.name} games={defaultGamelist.filter((game) => game.category === category.name)} viewAllLink={category.href} />
                            ))}


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

