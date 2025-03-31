import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LanguageSelector from "@/components/LanguageSelector"

export default function Footer() {

  const t = useTranslations("Footer")
  const homeT = useTranslations("HomePage")


  return (
    <footer>
      <div className="container mx-auto p-10 border border-gray-200 bg-white rounded-xl mb-8">
        <div className="text-gray-700 text-sm leading-relaxed space-y-6">
          <p>{homeT("catalogDesc")}</p>
          <p>
            {homeT("popularGamesDesc")}{" "}
            <Link href="/jogo/fireboy-and-watergirl" className="text-blue-600 hover:underline">
              Fireboy and Watergirl
            </Link>
            ,{" "}
            <Link href="/jogo/moto-x3m" className="text-blue-600 hover:underline">
              Moto X3M
            </Link>
            ,{" "}
            <Link href="/jogo/penalty-shooters-2" className="text-blue-600 hover:underline">
              Penalty Shooters 2
            </Link>
            ,{" "}
            <Link href="/jogo/bad-ice-cream" className="text-blue-600 hover:underline">
              Bad Ice Cream
            </Link>
            ,{" "}
            <Link href="/jogo/bubble-shooter" className="text-blue-600 hover:underline">
              Bubble Shooter
            </Link>
            , {homeT("andMore")}{" "}
            <Link href="/jogo/tic-tac-toe" className="text-blue-600 hover:underline">
              Tic-Tac-Toe
            </Link>
            ,{" "}
            <Link href="/jogo/pac-man" className="text-blue-600 hover:underline">
              Pac-Man
            </Link>
            ,{" "}
            <Link href="/jogo/solitaire" className="text-blue-600 hover:underline">
              Solitaire
            </Link>
            ,{" "}
            <Link href="/jogo/2048" className="text-blue-600 hover:underline">
              2048
            </Link>
            ,{" "}
            <Link href="/jogo/dino-chrome" className="text-blue-600 hover:underline">
              Dino Chrome
            </Link>
            , and more.
          </p>

          {/* 网站介绍*/}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{homeT("findFavoriteGames")}</h2>
            <p className="mb-4">{homeT("gamesOrganized")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <Link href="/categoria/2-jogadores" className="text-blue-600 hover:underline">
                  {homeT("twoPlayerGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/old-friv" className="text-blue-600 hover:underline">
                  {homeT("oldFrivGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/carros" className="text-blue-600 hover:underline">
                  {homeT("carGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/tiro" className="text-blue-600 hover:underline">
                  {homeT("shootingGames")}
                </Link>
              </li>
              <li>
                <Link href="/categoria/futebol" className="text-blue-600 hover:underline">
                  {homeT("soccerGames")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 关于网站 */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{homeT("aboutBlipzi")}</h2>
            <p className="mb-4">{homeT("aboutBlipziDesc1")}</p>
            <p className="mb-4">{homeT("aboutBlipziDesc2")}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col">
            {/* 导航链接 - 移动端两列布局 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
              <div>
                <Link href="/top-jogos" className="block hover:text-white transition-colors">
                  {t("topGames")}
                </Link>
              </div>
              <div>
                <Link href="/privacidade" className="block hover:text-white transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </div>
              <div>
                <Link href="/novos-jogos" className="block hover:text-white transition-colors">
                  {t("newGames")}
                </Link>
              </div>
              <div>
                <Link href="/contato" className="block hover:text-white transition-colors">
                  {t("contact")}
                </Link>
              </div>
              <div>
                <Link href="/categorias" className="block hover:text-white transition-colors">
                  {t("categories")}
                </Link>
              </div>
              <div>
                <Link href="/anuncie" className="block hover:text-white transition-colors">
                  {t("advertise")}
                </Link>
              </div>
              <div>
                <Link href="/sobre" className="block hover:text-white transition-colors">
                  {t("aboutUs")}
                </Link>
              </div>
            </div>

            {/* 版权信息和语言选择器 */}
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center text-sm">
                  {t("copyright")}
                  <span className="ml-2">
                    <Image
                      src="/placeholder.svg?height=16&width=60&text=7GRAUS"
                      alt="7GRAUS"
                      width={60}
                      height={16}
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

