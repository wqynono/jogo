import { getTranslations } from "next-intl/server"
// import AdComponent from "@/components/ad"
import { type Game, defaultGamelist } from "@/data/game"
import adConfig from "@/data/adConfig"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import "@/css/game-player.css"
import GameShowcase from "@/components/game-showcase"
import RecentlyPlayedSection from "@/components/recently-played-section"
import siteMetadata from "@/data/siteMetadata"
import ReactMarkdown from "react-markdown"
import type { Metadata } from "next"
import GameScreenshotsCarousel from "@/components/game-screenshots-carousel"
type Props = {
  params: Promise<{ game: string }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game } = await params
  const gameDetail: Game = defaultGamelist.find((item) => item.name === game) as Game
  if (gameDetail.google_play) {
    return {
      title: gameDetail?.title ? gameDetail?.title : (gameDetail.sub_name || gameDetail.name) + `Download Enemy ${gameDetail.sub_name || gameDetail.name} for Android | ${gameDetail.sub_name || gameDetail.name}  Mod APK `,
      description: gameDetail?.meta_desc ? gameDetail?.meta_desc : `Download ${gameDetail.sub_name || gameDetail.name} for Android and dive into intense FPS action! Get the latest version of ${gameDetail.sub_name || gameDetail.name} game and enjoy unlimited money and gold with our mod APK. Fight enemies, complete missions, and become a hero in this thrilling ${gameDetail.category} game!`,
    }
  } else {

    return {
      title: gameDetail.title || (gameDetail.sub_name || gameDetail.name) + ` - Free Online Anime ${gameDetail.category} Game | Play Instantly on JBUID`,
      description: gameDetail.meta_desc || `Play ${gameDetail.sub_name || gameDetail.name} instantly in your browser, with no download or ads.Enjoy this fun anime-themed ${gameDetail.category} game with simple controls on mobile and desktop`,
    }
  }
}

const MarkdownRenderer = ({ content }: { content: string }) => (
  <ReactMarkdown
    components={{
      h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-2xl font-bold  my-3">{props.children}</h1>
      ),
      h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-xl font-semibold mt-6 mb-2">{props.children}</h2>
      ),
      h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-md font-medium mt-4 mb-2">{props.children}</h3>
      ),
      p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text-sm leading-relaxed mb-2">{props.children}</p>
      ),
      li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="ml-4 list-disc">{props.children}</li>,
    }}
  >
    {content}
  </ReactMarkdown>
)
export default async function Name({
  params,
}: {
  params: any
}) {
  const t = await getTranslations("HomePage")
  const categoryT = await getTranslations("Categories")
  const { game } = await params
  const gameDetail: Game = defaultGamelist.find((item) => item.name === game) as Game
  const commonJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": gameDetail.sub_name || gameDetail.name,
    "url": `${siteMetadata.siteUrl}/game/${game}`,
    "description": gameDetail.review || gameDetail.desc_text,
    "image": gameDetail.icon,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": gameDetail.rating,
      "ratingCount": 100,
      "bestRating": "5"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteMetadata.name
    },
    "review": {
      "@type": "Review",
      "itemReviewed": {
        "@type": "Game",
        "name": gameDetail.sub_name || gameDetail.name
      },
      "reviewBody": gameDetail.review || gameDetail.desc_text,
      "author": {
        "@type": "Person",
        "name": "Debbie",
        "url": "https://www.youtube.com/channel/UCwj0tsz7Bbz2xxL1SMq5K0w"
      },
      "datePublished": gameDetail.create_time,
    },
    "faqPage": {
      "name": `${gameDetail.sub_name || gameDetail.name} FAQ`,
      "@type": "FAQPage",
      "mainEntity": gameDetail?.FAQS
        ? gameDetail.FAQS?.map((item: any) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
        : {
          "@type": "Question",
          "name": `What is this ${gameDetail.sub_name || gameDetail.name} game about?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": gameDetail.desc_text
          }
        }

    },
    "video": gameDetail.videoUrl
      ? {
        "@type": "VideoObject",
        "name": `${gameDetail.sub_name || gameDetail.name} Gameplay Video`,
        "description": `Watch the gameplay video of ${gameDetail.sub_name || gameDetail.name}`,
        "contentUrl": gameDetail.videoUrl,
        "embedUrl": gameDetail.videoEmbedUrl,
        "uploadDate": gameDetail.create_time + "+00:00",
        "thumbnailUrl": gameDetail.videoThumbnail
      }
      : {},
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${siteMetadata.siteUrl}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Games",
          "item": `${siteMetadata.siteUrl}/games`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": gameDetail.sub_name || gameDetail.name,
          "item": `${siteMetadata.siteUrl}/game/${gameDetail.name}`
        }
      ]
    }
  };

  const jsonLd = gameDetail.google_play
    ? Object.assign({}, commonJsonLd, {
      "@type": "MobileApplication",
      "applicationCategory": "GameApplication",
      "operatingSystem": ["ANDROID", "IOS"],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "url": gameDetail.appConfig?.[0]?.url || "",
        "availability": "https://schema.org/InStock"
      },
      "itemListElement": gameDetail.appConfig?.map((item: any, index: number) => ({
        "@type": "SiteNavigationElement",
        "position": index + 1,
        "@id": item.url,
        "name": "Apps",
        "url": item.url
      })) || []
    })
    : Object.assign({}, commonJsonLd, {
      "genre": gameDetail.category,
      "gamePlatform": gameDetail.type,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteMetadata.siteUrl}/games/${game}`
      }
    });


  const categoryGame = defaultGamelist.filter(
    (item) => item.category === gameDetail.category && item.name !== gameDetail.name,
  )
  return (
    <div>
      <section>
        <script async type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </section>
      <div className="min-h-screen">
        <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
          <div className="mx-auto px-4 py-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-11 gap-4 grid-flow-row">
              {categoryGame.slice(0, 46).map((game, index) => {
                return (
                  <React.Fragment key={String(game.id)}>
                    {/* 正常渲染游戏卡片 */}
                    <div className="game-card">
                      <Link href={`/game/${game.name}`} className="block group w-full h-full">
                        <div className="relative aspect-square overflow-hidden rounded-lg w-full h-full">
                          <Image
                            src={game.icon || "/placeholder.svg"}
                            alt={game.sub_name || game.name}
                            fill
                            sizes="(100vw - 16px) 100vw"
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
                  </React.Fragment>
                )
              })}

              {/* 游戏位置 */}
              <div
                className={`col-start-1 col-end-4 row-start-1 row-end-4 min-h-[320]  shadow-lg  rounded-lg overflow-hidden
                      sm:col-start-1 sm:col-end-5 sm:row-start-1 sm:row-end-4  sm:min-h-[360]
                      md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-5 md:min-h-[440]
                      lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-4 lg:min-h-[440]
                      xl:col-start-1 xl:col-end-7 xl:row-start-1 xl:row-end-5 xl:min-h-[550]
                      2xl:col-start-3 2xl:col-end-9 2xl:row-start-1 2xl:row-end-5 2xl:min-h-[440]`}
              >
                <GameShowcase game={gameDetail as Game} />
              </div>

              {/* 广告位置右侧 */}
              {/* <div
                className={`bg-white col-start-1 col-end-4 row-start-5 row-end-8 min-h-[350] shadow-lg border-1 border-gray-200 rounded-lg 
                      sm:col-start-1 sm:col-end-5 sm:row-start-5 sm:row-end-8  sm:min-h-[360]
                      md:col-start-1 md:col-end-6 md:row-start-6 md:row-end-9 md:min-h-[440]
                      lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-4 lg:min-h-[440]
                      xl:col-start-7 xl:col-end-9 xl:row-start-1 xl:row-end-5 xl:min-h-[550]
                      2xl:col-start-9 2xl:col-end-12 2xl:row-start-1 2xl:row-end-5 2xl:min-h-[440]`}
              >
                <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1 rounded-t-lg">
                  {t("advertisement")}
                </span>

                <AdComponent data-ad-slot={adConfig.zfx[0]} data-ad-format={"auto"} data-full-width-responsive={true} />
              </div> */}

              {/* 广告位置底部 */}
              {/* <div
                className={`bg-white min-h-[100] col-start-1 col-end-[-1] shadow-lg border-1 border-gray-200 rounded-lg 
                      lg:col-start-1 lg:col-end-5 lg:row-start-4 lg:row-end-5
                      xl:col-start-1 xl:col-end-7 xl:row-start-5 xl:row-end-6
                      2xl:col-start-3 2xl:col-end-9 2xl:row-start-5 2xl:row-end-6`}
              >
                <AdComponent data-ad-slot={adConfig.hx} data-ad-format={"auto"} data-full-width-responsive={true} />

                <span className="text-xs text-gray-500 text-center w-full block bg-gray-200 p-1">
                  {t("advertisement")}
                </span>
              </div> */}

              {/* 玩过的游戏 */}
              <div className="col-start-1 col-end-[-1]">
                <RecentlyPlayedSection />
              </div>
              {/* 游戏介绍 */}
              <div className="col-start-1 col-end-[-1] bg-white rounded-lg overflow-hidden shadow-md">
                {/* 游戏头部区域 */}
                <div className="relative h-30  bg-black overflow-hidden">
                  <div
                    className="absolute right-0 top-0 bottom-0 w-[40%] overflow-hidden"
                    style={{
                      maskImage: "linear-gradient(to right, transparent, black 30%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
                    }}
                  >
                    <Image
                      src={(gameDetail as Game).icon || ""}
                      alt={(gameDetail as Game).name || ""}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* 整体遮罩层 */}
                  <div className="absolute inset-0 bg-black/40 z-[1]"></div>

                  {/* 游戏标题和副标题 */}
                  <div className="relative z-10 h-full flex flex-col justify-center p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-lime-400 w-max">{(gameDetail as Game).sub_name ? (gameDetail as Game).sub_name : (gameDetail as Game).name}</h1>
                    {gameDetail.platform && <h2 className="text-xs sm:text-sm px-2 py-1 mx-1 text-white">Platforms: {gameDetail.platform}</h2>}
                    <div className="flex flex-wrap justify-start text-sm sm:text-base text-white mt-1">
                      {
                        (gameDetail as Game).category &&
                        <h2 className="text-sm text-white  rounded-full px-2  mx-1 ">
                          {categoryT((gameDetail as Game).category.toLowerCase()) + " " + t("games") || ""}
                        </h2>
                      }

                      {(gameDetail as Game).tags &&
                        gameDetail.tags?.split(",").map((tag: string) => {
                          return (
                            <h2 key={tag} className="text-sm text-white  rounded-full px-2 mx-1 ">
                              {tag}
                            </h2>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

                {/* 游戏描述 */}
                <div className="p-4 sm:p-6">
                  {(gameDetail as Game).screenshots && (
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                        {"Game Screenshots"}
                      </h2>

                      <GameScreenshotsCarousel screenshots={(gameDetail as Game).screenshots || []} />
                    </div>
                  )}

                  {/* <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-3">{(gameDetail as Game).sub_name || ""} – Free Online {(gameDetail as Game).category} Game </h1> */}

                  <div>
                    <MarkdownRenderer content={(gameDetail as Game).desc_text || ""} />

                  </div>
                  {/* Game Screenshots Carousel */}

                </div>
              </div>
              {
                (gameDetail as Game).FAQS && (
                  <div className="col-start-1 col-end-[-1] bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="block lg:flex p-4 sm:p-6">
                      <div className='flex-1'>
                        <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">FAQS </p>
                        {
                          gameDetail?.FAQS?.map((item: any, index: number) => {
                            return (
                              <div key={index} className="mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{item.question}</h2>
                                <MarkdownRenderer content={item.answer} />

                              </div>
                            )

                          })
                        }
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3"></h2>
                      </div>
                      <div className='w-full ml-0 mt-4 lg:w-[600px] flex-none lg:ml-6 lg:mt-0' >
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Featured Videos </h2>
                        <iframe className='w-full' height={315} src={(gameDetail as Game).videoEmbedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
