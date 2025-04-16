import siteMetadata from "@/data/siteMetadata"
import NotFound from "@/components/notFound"
export default async function HomePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "404 - page not found",
        "url": siteMetadata.siteUrl + "/not_found",
        "description": "not found page"
    }
    return (
        <div className="my-6 flex items-center justify-center  text-gray-800">
            <section>
                <script
                    async
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </section>
            <NotFound />

        </div>
    )
}

