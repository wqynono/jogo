import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

import { useTranslations } from 'next-intl';
export default function Home() {
  const t = useTranslations('Index');
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
            {t('greeting')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
         <li>1111111</li>
         <div>111</div>
        </ul>
      </div>
      
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          {/* <NewsletterForm /> */}
        </div>
      )}
    </>
  )
}
