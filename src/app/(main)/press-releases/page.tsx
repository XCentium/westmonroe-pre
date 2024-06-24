import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getNewsArticles from '@/components/NewsArticles/data/getNewsArticles'

export { dynamic, revalidate } from '@/ssr'

export default async function Page({}: Core.Page<{ path: string }>) {
  const result = await getNewsArticles()

  if (!result.ok || !result.data) {
    return notFound()
  }

  return (
    <>
      <div className="bg-gray-200">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24  lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 bg-gray-100 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {result?.data?.newsArticles.map((item) => (
              <div key={item.title} className="group relative bg-white">
                <div>
                  <img
                    src={
                      item.summary_info.summary_imageConnection.edges?.length
                        ? item.summary_info.summary_imageConnection.edges[0].node.url
                        : 'https://images.contentstack.io/v3/assets/blta09a8b171a0baaf1/blt17846f8bcbf7d54e/665f573e4ddc4b152809e9ba/PressRelease_1600x1600.jpg'
                    }
                    style={{ width: 351, height: 200 }}
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-6 flex justify-between">
                  <div className="">
                    <p className="text-md text-black-500 font-bold">{item.date} | Press Release</p>
                  </div>
                </div>
                <div font-bold className="row mt-12">
                  <h1 className="row text-lg">
                    <a href={item.url + '?uid=' + item.system.uid}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <h1>{item.title}</h1>
                    </a>
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
