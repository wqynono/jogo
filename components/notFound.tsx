import Link from "next/link"
import { useTranslations } from "next-intl"
export default function notFound() {
    const t = useTranslations("NotFound")
    return (

        <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
            <p className="text-2xl md:text-3xl mb-8"> {t("title")}</p>
            <p className="text-lg md:text-xl mb-8">
                {t("description")}

            </p>
            <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md shadow-md">
                    {t("backHome")}
                </button>
            </Link>
        </div>
    )
}

