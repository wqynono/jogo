import { getTranslations } from "next-intl/server"
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "jbuid.top privacy title",
    description: "jbuid.top privacy description",
  }
}

export default async function Privacy() {
  const t = await getTranslations("Privacy")
  const domain = "jbuid.top"

  return (
    <div className="min-h-screen">
      <div className="min-h-screen max-w-full mx-auto xl:max-w-[91.67%]">
        <div className="mx-auto px-4 py-6">
          {/* 主内容区域 */}
          <div className="grid gap-4 justify-center grid-cols-3 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 2xl:grid-cols-14">
          </div>
          <main className="mx-auto mt-3 rounded-2xl px-4 py-4 bg-white primary-shadow">
            <div className="mx-auto">
              {/* Title */}
              <h1 className="text-xl md:text-3xl font-bold text-center">{t("title")}</h1>

              {/* Introduction */}
              <section className="mb-8">
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">{t("intro", { domain })}</p>
              </section>

              {/* Information Collection */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">1. {t("infoCollection")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("infoCollection")}</p>
              </section>

              {/* Information Use */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">2. {t("infoUse")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("infoUse")}</p>
              </section>

              {/* Information Sharing */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">3. {t("infoSharing")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("infoSharing")}</p>
              </section>

              {/* Cookies */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">4. {t("cookies")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("cookies")}</p>
              </section>

              {/* Security */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">5. {t("security")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("security")}</p>
              </section>

              {/* Additional Information */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">{t("additionalInfo", { domain })}</h2>
                <p className="text-gray-700 leading-relaxed">{t("additionalInfo", { domain })}</p>
              </section>

              {/* Cookies and Technology */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">{t("cookiesAndTech", { domain })}</h2>
                <p className="text-gray-700 leading-relaxed">{t("cookiesAndTech", { domain })}</p>
              </section>

              {/* Third-Party Ads */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">{t("thirdPartyAds")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("thirdPartyAds")}</p>
              </section>

              {/* Google Ads */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">{t("googleAds")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("googleAds")}</p>
              </section>

              {/* Policy Updates */}
              <section>
                <h2 className="text-lg font-semibold mb-4">{t("policyUpdates")}</h2>
                <p className="text-gray-700 leading-relaxed">{t("policyUpdates")}</p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}