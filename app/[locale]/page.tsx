
import GameGrid from "@/components/game-grid"
import AdComponent from "@/components/ad" // 导入广告组件
import GameSlide from "@/components/game-slide"
import { categoryList, defaultGamelist } from "@/data/game"
import { useTranslations } from "next-intl"
import adConfig from "@/data/adConfig"
import siteMetadata from "@/data/siteMetadata"

export default function HomePage() {
  const t = useTranslations("HomePage")
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteMetadata.siteUrl,
    "url": siteMetadata.siteUrl
  }
  return (
    <>
      <div>
        <section>
          <script
            async
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </section>
        <div className="min-h-screen">
          <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
            <div className="mx-auto px-4 py-6">
              <GameGrid gameMobileLength={60} gamePcLength={80} />
              {/* <div className="bg-white shadow-md my-4 min-w-[320px]  min-h-[270px] border-1 border-gray-200 rounded-lg ">
                <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1 ">
                  {t("advertisement")}</span>
                <AdComponent data-ad-slot={adConfig.zfx[0]} data-ad-format={"auto"} data-full-width-responsive={true} />
              </div> */}
              {/* <GameGrid gameMobileLength={18} gamePcLength={18} /> */}

              <div className="mt-8">
                {categoryList.slice(0, 4).map((category) => (
                  <GameSlide key={category.name} name={category.name} games={defaultGamelist.filter((game) => game.category === category.name).slice(0, 12)} viewAllLink={category.href} />
                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </>

  );
}