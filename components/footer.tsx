import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LanguageSelector from "@/components/LanguageSelector"
import { categoryList, defaultGamelist } from "@/data/game"
export default function Footer({ locale }: { locale: string }) {
  const arr = ["Ragdoll-hit", "DoodleRoad", "Paperio2", "tanks", "JetpackJump"]
  const footerGameArr = defaultGamelist.filter((game) => arr.includes(game.name))
  const recommendGameArr = defaultGamelist.slice(0, 10)
  const t = useTranslations("Footer")
  const homeT = useTranslations("HomePage")

  const tCategories = useTranslations("Categories");
  const tDesc = useTranslations("CategoriesDesc");

  return (
    <footer>
      <div className="container mx-auto px-10 py-4 border border-gray-200 bg-white rounded-xl mb-8">
        <div className="text-gray-700 text-sm leading-relaxed space-y-6">


          {/* 网站介绍*/}
          <div>
            <section className="mt-2 text-md">
              <h1 className="text-xl font-bold">🎮 Dive Into Free Online HTML5 Mini Games 🌟</h1>
              <p>
                Hey there, gamer! Welcome to <strong>JBUID</strong> — your playground for
                <strong>free online HTML5 mini games</strong> 🕹️. No downloads, no sign-ups, just tap and play 🎉!
                Whether you're chilling on a phone 📱, grinding on a PC 🖥️, or swiping on a tablet 📲 — our
                <strong>mini games require no download</strong> and work right from your browser.
                <strong>Lightweight</strong>, fast, and <strong>cross-platform HTML5 games online</strong> ⚡.
                Enjoy games download free for PC or jump into browser versions that work smoothly even on Mac — no installs needed.
              </p>
            </section>

            <section className="mt-2 text-md">
              <h2 className="text-xl font-bold">🧠 Chill or Challenge? We’ve Got It All! 🏃‍♂️🧩</h2>
              <p>
                Looking for a brain workout or a casual escape? Our handpicked
                <strong>HTML5 mini game collection</strong> has you covered ✅.<br />
                ✨ Into puzzles? Try our <strong>best HTML5 puzzle games for mobile</strong> or enjoy
                <strong>no download puzzle games for adults</strong> during breaks.<br />
                🍬 Just wanna relax? Play some <strong>simple mobile games to relax your brain</strong>.<br />
                🏃 Craving action? Dash through <strong>simple runner games for students</strong> or jump into
                <strong>no login free online action games</strong> that start instantly.<br />
                🎮 Feeling nostalgic? Our <strong>classic retro mini games</strong> bring back all the feels.<br />
                All games are fast, fun, and perfect if you're looking for <strong>fun mini games to play at work</strong> 😉.
              </p>
            </section>

            <section className="mt-2 text-md mb-2">
              <h2 className="text-xl font-bold">❤️ Just Pure Fun. Loved by Millions </h2>
              <p>
                Forget annoying pop-ups 😤. At <strong>JBUID</strong>, you get
                <strong>ad-free online mini games</strong> with no distractions. Join over
                <strong>2 million happy players</strong> each month who enjoy gaming the clean, fun way.<br />
                Whether you’re downloading games free for Mac, looking for quick play sessions on mobile,
                or browsing at your desk — JBUID delivers.<br />
                Play solo, invite your friends 👯, or explore our <strong>global community</strong> 🌍.
              </p>
              <p>
                {homeT("popularGamesDesc")}{" "}

                {recommendGameArr.map((game) => {
                  return (
                    <Link href={`/${locale}/game/${game.name}`} className="text-blue-600 hover:underline">
                      {game.sub_name || game.name},{" "}
                    </Link>
                  )
                })}
              </p>
            </section>



            <section className="mt-2 text-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4  ">{homeT("findFavoriteGames")}</h2>
              <p className="mb-4">{homeT("gamesOrganized")}</p>
              <ul className="list-disc pl-6 space-y-1">
                {categoryList.map((category) => {
                  return (
                    <li key={category.name}>
                      <Link href={`/${locale}${category.href}`} className="text-blue-600 hover:underline">
                        <span>{tCategories(category.name.toLowerCase())} {homeT("games")}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className="mt-2 text-md">
              <h2 className="text-xl font-bold">🌐 Play in Your Language 🗣️</h2>
              <p>
                Gaming is for everyone! 🌏 Choose from:
                🇬🇧 <strong>English</strong> | 🇨🇳 <strong>中文</strong> | 🇯🇵 <strong>日本語</strong> |
                🇰🇷 <strong>한국어</strong> | 🇷🇺 <strong>Русский</strong><br />
                More languages coming soon!
              </p>
            </section>
          </div>

          {/* 关于网站 */}
          {/* <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{homeT("aboutJbuid")}</h2>
            <p className="mb-4">{homeT("aboutJbuidDesc1")}</p>
            <p className="mb-4">{homeT("aboutJbuidDesc2")}</p>
          </div> */}
        </div>
      </div>

      <div className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col">
            {/* 导航链接 - 移动端两列布局 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-8">
              <div>
                <div>
                  <Link href={`/${locale}/top`} className="block hover:text-white transition-colors">
                    {t("topGames")}
                  </Link>
                </div>
                <div>
                  Recommend Games :
                </div>
                <div>
                  {footerGameArr.map((game) => {
                    return (
                      <Link href={`/${locale}/game/${game.name}`} className="block hover:text-white transition-colors">
                        {game.sub_name || game.name}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div>
                <Link href={`/${locale}/about`} className="block hover:text-white transition-colors">
                  {t("aboutUs")}
                </Link>
              </div>


              {/* <div>
                <Link href={`/${locale}/category`} className="block hover:text-white transition-colors">
                  {t("categories")}
                </Link>
              </div> */}



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

