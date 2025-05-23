import GameGrid from "@/components/game-grid"
import { defaultGamelist } from "@/data/game";
import { getTranslations } from 'next-intl/server';
import siteMetadata from "@/data/siteMetadata";
import { Metadata } from "next";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return {
        alternates: {
            canonical: `${siteMetadata.siteUrl}/${locale}/top`,
            languages: {
                'en': `${siteMetadata.siteUrl}/en/top`,
                'ja': `${siteMetadata.siteUrl}/ja/top`,
                'ko': `${siteMetadata.siteUrl}/ko/top`,
                'zh': `${siteMetadata.siteUrl}/zh/top`,
                'ru': `${siteMetadata.siteUrl}/ru/top`,
                'x-default': `${siteMetadata.siteUrl}/en/top`,
            },
        },
    }

}

export default async function TopPage() {
    return (
        <div>
            <div className="min-h-screen">
                <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
                    <div className="mx-auto px-4 pb-6">
                        <div className="text-2xl font-bold py-2.5 text-[#1E3A8A]">Top Games</div>
                        <GameGrid gameMobileLength={100} gamePcLength={100} gamelist={defaultGamelist.filter((game) => game.isfunny === "1")} />
                    </div>
                </div>
            </div>
        </div>
    );
}