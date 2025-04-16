import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LanguageSelector from "@/components/LanguageSelector"
import { categoryList } from "@/data/game"
export default function Footer() {

  const t = useTranslations("Footer")
  const homeT = useTranslations("HomePage")

  const tCategories = useTranslations("Categories");
  const tDesc = useTranslations("CategoriesDesc");

  return (
    <footer>
      <div className="container mx-auto p-10 border border-gray-200 bg-white rounded-xl mb-8">
        <div className="text-gray-700 text-sm leading-relaxed space-y-6">
          <p>{homeT("catalogDesc")}</p>
          <p>
            {homeT("popularGamesDesc")}{" "}
            <Link href="/game/bacon-may-die" className="text-blue-600 hover:underline">
              Bacon may die
            </Link>
            ,{" "}
            <Link href="/game/castle-wars-middle-ages" className="text-blue-600 hover:underline">
              Castle wars middle ages
            </Link>
            ,{" "}
            <Link href="/game/raft-wars-2" className="text-blue-600 hover:underline">
              Raft wars 2
            </Link>
            {" "}.
          </p>

          {/* 网站介绍*/}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{homeT("findFavoriteGames")}</h2>
            <p className="mb-4">{homeT("gamesOrganized")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {categoryList.map((category) => {
                return (
                  <li>
                    <Link key={category.name} href={category.href} className="text-blue-600 hover:underline">
                      <span>{tCategories(category.name.toLowerCase())}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 关于网站 */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{homeT("aboutJbuid")}</h2>
            <p className="mb-4">{homeT("aboutJbuidDesc1")}</p>
            <p className="mb-4">{homeT("aboutJbuidDesc2")}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col">
            {/* 导航链接 - 移动端两列布局 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
              <div>
                <Link href="/top" className="block hover:text-white transition-colors">
                  {t("topGames")}
                </Link>
              </div>
              <div>
                <Link href="/privacy" className="block hover:text-white transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </div>

              <div>
                <Link href="/categorias" className="block hover:text-white transition-colors">
                  {t("categories")}
                </Link>
              </div>
              <div>
                <Link href="/about" className="block hover:text-white transition-colors">
                  {t("aboutUs")}
                </Link>
              </div>
            </div>

            {/* 版权信息和语言选择器 */}
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center text-sm">
                  {t("copyright", { domain: "jbuid.top" })}
                  <span className="ml-2">
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      width={36}
                      height={36}
                      className="inline-block"
                    />
                  </span>
                </p>
              </div>

              {/* 语言选择器 */}
              <LanguageSelector />
            </div>
          </div>

        </div>
      </div>
    </footer >
  )
}

