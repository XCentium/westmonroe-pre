import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getNewsArticleDetails from '@/components/NewsArticles/data/getNewsArticleDetails'
export { dynamic, revalidate } from '@/ssr'

export default async function Page({
  searchParams,
}: Core.Page<{ path: string; searchParams?: { [key: string]: string | string[] | undefined } }>) {
  const uid = searchParams?.uid

  if (uid != null) {
    const result = await getNewsArticleDetails(uid.toString())

    if (!result.ok || !result.data) {
      return notFound()
    }
    console.log('modules ', result?.data?.newsArticle?.modules)
    return (
      <>
        <div className="overflow-hidden">
          <div className="sm:pt-54 mx-auto max-w-2xl px-6 pb-14 pt-14 lg:px-4 lg:pt-20">
            <p>{result?.data?.newsArticle.date} | PRESS RELEASE</p>
            <h1 className="text-4lg tracking-tight text-gray-700 sm:text-5xl">{result?.data?.newsArticle.title}</h1>
          </div>

          <div className="lg:max-w-2 mx-auto border-t border-gray-300 px-14 pb-36 lg:mx-16 lg:flex lg:items-center">
            <div className="text-md relative mt-12 w-full leading-8 text-gray-600 sm:max-w-md lg:max-w-none lg:shrink-0 xl:max-w-2xl">
              {result?.data?.newsArticle?.modules?.map((moduleItem) =>
                moduleItem.__typename === 'NewsArticleModulesRichtext' && moduleItem.richtext.is_quote ? (
                  <div className="px-18 border-t border-gray-300 py-10 text-xl leading-8 text-gray-800">
                    <p dangerouslySetInnerHTML={{ __html: moduleItem.richtext?.rich_text_editor }}></p>
                  </div>
                ) : (
                  <div className="pb-14">
                    <p dangerouslySetInnerHTML={{ __html: moduleItem.richtext?.rich_text_editor }}></p>
                  </div>
                ),
              )}
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"></div>
          </div>
        </div>
      </>
    )
  }
}
