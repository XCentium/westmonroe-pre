import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getTeamMemberDetails from '@/components/Team/data/getTeamMemberDetails'
export { dynamic, revalidate } from '@/ssr'

export default async function Page({
  searchParams,
}: Core.Page<{ path: string; searchParams?: { [key: string]: string | string[] | undefined } }>) {
  const uid = searchParams?.uid

  if (uid != null) {
    const result = await getTeamMemberDetails(uid.toString())

    if (!result.ok || !result.data) {
      return notFound()
    }

    return (
      <>
        <div className="">
          <div className="flex w-full justify-between bg-violet-800 py-10 group-hover:opacity-75">
            <div>
              <img
                src={result?.data?.teamMember.pictureConnection.edges[0]?.node.url}
                alt=""
                className="w-120 h-60 px-6"
              />
            </div>
            <div className="text-6xl text-white">{result?.data?.teamMember.title}</div>
            <div className="mr-80 py-20 text-2xl text-white">
              {result?.data?.teamMember.position}
              <a
                href={result?.data?.teamMember.linkedin_profile?.href}
                className="mt-10 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-[#0077b5]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mx-auto flex max-w-5xl justify-between px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-12">
            <div className="text-md font-bold text-gray-600 sm:text-lg">Experience</div>

            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <div className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                <div dangerouslySetInnerHTML={{ __html: result?.data?.teamMember.bio }}></div>
              </div>
              <div className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                <h2 className="text-4l sm:text-6l font-bold tracking-tight text-gray-900">
                  What makes {result?.data?.teamMember.title} different
                </h2>
                <div dangerouslySetInnerHTML={{ __html: result?.data?.teamMember.differentiation }}></div>
              </div>
              <div className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                <h2 className="text-4l sm:text-6l font-bold tracking-tight text-gray-900">
                  Where {result?.data?.teamMember.title} makes an impact
                </h2>
                <div dangerouslySetInnerHTML={{ __html: result?.data?.teamMember.impact }}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
