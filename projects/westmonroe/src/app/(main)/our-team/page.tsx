import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getTeamMembers from '@/components/Team/data/getTeamMembers'

export { dynamic, revalidate } from '@/ssr'

export default async function Page({}: Core.Page<{ path: string }>) {
  console.log('page-called')
  const result = await getTeamMembers()

  if (!result.ok || !result.data) {
    return notFound()
  }
  console.log('result is---', result?.data?.teamMembers.length)
  return (
    <>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {result?.data?.teamMembers.map((item) => (

        <div key={item.title} className="group relative">
          <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
            <img
              src={item.pictureConnection.edges[0].node.url}
              alt={item.pictureConnection.edges[0].node.title}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm">
                <a href = {item.url+ "?uid=" + item.system.uid}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  <h3>{item.title}</h3>
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.position}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{item.short_bio}</p>
          </div>
        </div>
      ))}
      </div>
      </div>
      </div>
    </>
  )
}
