import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/src/createMetadataGenerator'
import getTeamMembers from '@/components/Team/data/getTeamMembers'

export { dynamic, revalidate } from '@/ssr'

export default async function Page({}: Core.Page<{ path: string }>) {
  const result = await getTeamMembers()

  if (!result.ok || !result.data) {
    return notFound()
  }
  return (
    <>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {result?.data?.teamMembers.map((item) => (

        <div key={item.title} className="group relative">
          <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
          <a href = {item.url+ "?uid=" + item.system.uid}>
            <img
              src={item.pictureConnection.edges[0]?.node.url}
              alt={item.pictureConnection.edges[0]?.node.title}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </a>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <h3 className="font-semibold text-md">
                <a href = {item.url+ "?uid=" + item.system.uid}>
                  <h3>{item.title}</h3>
                </a>
              </h3>
              </div>
              <a href = {item.linkedin_profile?.href} className="[&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-[#0077b5]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
              </a>
            </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-medium text-gray-500">{item.short_bio}</p>
          </div>
        </div>
      ))}
      </div>
      </div>
      </div>
    </>
  )
}
