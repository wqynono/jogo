import { getTranslations } from "next-intl/server";
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy page",
  };
}

export default async function Privacy() {
  const t = await getTranslations("Privacy");
  const domain = "jbuid.top";

  return (
    <div className="max-w-full mx-auto xl:max-w-[91.67%]">
      <div className="px-4 py-6">
        <main className="rounded-2xl bg-white primary-shadow p-6">
          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-6">{t("intro", { domain })}</p>

          <section className="mb-6">
            <p className="text-sm md:text-lg text-gray-700">{t("infoCollection")}</p>
          </section>

          <section className="mb-6">
            <p className="text-sm md:text-lg text-gray-700">{t("infoUse")}</p>
          </section>

          <section className="mb-6">
            <p className="text-sm md:text-lg text-gray-700">{t("infoSharing")}</p>
          </section>

          <section className="mb-6">
            <p className="text-sm md:text-lg text-gray-700">{t("cookies")}</p>
          </section>

          <section className="mb-6">
            <p className="text-sm md:text-lg text-gray-700">{t("security")}</p>
          </section>

          <section>
            <p className="text-sm md:text-lg text-gray-700">{t("policyUpdates")}</p>
          </section>
        </main>
      </div>
    </div>
  );
}
