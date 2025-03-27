
import GameGrid from "@/components/game-grid"
import AdComponent from "@/components/ad" // 导入广告组件
import GameSlide from "@/components/game-slide"
import { categoryList, defaultGamelist } from "@/data/game"


export default function HomePage() {

  return (
    <div>
      <div className="min-h-screen">
        <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
          <div className="mx-auto px-4 py-6">
            <GameGrid gameMobileLength={24} gamePcLength={45} />
            <div className="bg-white shadow-md p-4 my-4">
              <AdComponent />
            </div>
            <GameGrid gameMobileLength={18} gamePcLength={18} />

            <div className="container my-4 mx-auto">
              {categoryList.slice(0, 4).map((category) => (
                <GameSlide key={category.name} name={category.name} games={defaultGamelist.filter((game) => game.category === category.name)} viewAllLink={category.href} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}