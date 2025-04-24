import { getTranslations } from "next-intl/server"
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "About page",
    }
}

export default async function About() {
    const t = await getTranslations("About")
    const domain = "jbuid.top"

    return (
        <div className="min-h-screen">
            <div className="min-h-screen max-w-full mx-auto xl:max-w-[91.67%]">
                <div className="mx-auto px-4 py-6">
                    {/* 主内容区域 */}
                    <div className="grid gap-4 justify-center grid-cols-3 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-14">
                    </div>
                    <main className="mx-auto mt-3 rounded-2xl px-4 py-6 bg-white primary-shadow">
                        <div className="mx-auto">
                            {/* Title */}
                            <h1 className="text-xl md:text-3xl font-bold text-center">{t("title")}</h1>

                            {/* Welcome Message */}
                            <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-8">{t("welcome", { domain })}</p>

                            {/* Description */}
                            <div className="mb-4 md:mb-8">
                                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">{t("description", { domain })}</p>
                            </div>

                            {/* Join Us */}
                            <div className="mb-4 md:mb-8">
                                <p className="text-sm md:text-lg text-gray-700 font-semibold">{t("joinUs", { domain })}</p>
                            </div>

                            {/* About Us Section */}
                            <section className="mb-4 md:mb-8">
                                <h2 className="text-lg md:text-2xl font-bold mb-4">{t("aboutUs", { domain })}</h2>
                                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">{t("aboutUsContent", { domain })}</p>
                            </section>

                            {/* Our Team Section */}
                            <section className="mb-4 md:mb-8">
                                <h2 className="text-lg md:text-2xl font-bold mb-4">{t("ourTeam")}</h2>
                                <div className="space-y-4">
                                    <p className="text-sm md:text-lg text-gray-700">{t("teamMember1")}</p>
                                    <p className="text-sm md:text-lg text-gray-700">{t("teamMember2")}</p>
                                </div>
                            </section>

                            {/* Parent Info Section */}
                            <section className="mb-4 md:mb-8">
                                <h2 className="text-lg md:text-2xl font-bold mb-4">{t("parentInfo")}</h2>
                                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">{t("parentInfoContent", { domain })}</p>
                            </section>

                            {/* Privacy Section */}
                            <section className="mb-4 md:mb-8">
                                <h2 className="text-lg md:text-2xl font-bold mb-4">{t("privacy")}</h2>
                                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">{t("privacyContent", { domain })}</p>
                            </section>

                            {/* Registration Section */}
                            <section className="mb-4 md:mb-8">
                                <h2 className="text-lg md:text-2xl font-bold mb-4">{t("registration")}</h2>
                                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">{t("registrationContent", { domain })}</p>
                            </section>

                            {/* Intellectual Property Section */}
                            <section className="mb-4 md:mb-8">
                                <h2 className="text-lg md:text-2xl font-bold mb-4">{t("intellectualProperty")}</h2>
                                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">{t("intellectualPropertyContent", { domain })}</p>
                            </section>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}