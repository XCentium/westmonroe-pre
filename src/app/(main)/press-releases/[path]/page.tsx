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
    return (
      <>
        <div className="overflow-hidden">
          <div className="sm:pt-54 mx-auto max-w-2xl pb-14 pt-14 lg:px-16 lg:pt-20">
            <p>{result?.data?.newsArticle.date} | PRESS RELEASE</p>
            <h1 className="text-4lg tracking-tight text-gray-700 sm:text-5xl">{result?.data?.newsArticle.title}</h1>
          </div>

          <div className="border-t-2 border-gray-300  lg:flex lg:items-center">
            <div className=" pr-50 ml-80 mt-12 text-gray-600 lg:max-w-xl">
              {result?.data?.newsArticle?.modular_blocks?.map((moduleItem) =>
                moduleItem?.__typename === 'NewsArticleModularBlocksRichText' ? (
                  moduleItem?.rich_text.is_quote ? (
                    <div className="border-y border-gray-300 px-8 py-6 text-xl leading-8 text-gray-800">
                      <div dangerouslySetInnerHTML={{ __html: moduleItem.rich_text?.content }}></div>
                    </div>
                  ) : (
                    <div className="px-18 text-md py-6 leading-8 text-gray-800">
                      <div dangerouslySetInnerHTML={{ __html: moduleItem.rich_text?.content }}></div>
                    </div>
                  )
                ) : moduleItem?.__typename === 'NewsArticleModularBlocksImageFullWidth' ? (
                  <div className="pb-14">
                    <img src={moduleItem?.image_full_width?.imageConnection?.edges[0]?.node?.url} />
                  </div>
                ) : (
                  <div></div>
                ),
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}
