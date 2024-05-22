import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getTeamMemberDetails from '@/components/Team/data/getTeamMemberDetails'
export { dynamic, revalidate } from '@/ssr'

export default async function Page({
  searchParams,
}: Core.Page<{ path: string; searchParams?: { [key: string]: string | string[] | undefined } }>) {
  console.log('page-called')
  const uid = searchParams?.uid

  console.log('uid is', uid)
  if (uid != null) {
    const result = await getTeamMemberDetails(uid.toString())

    if (!result.ok || !result.data) {
      return notFound()
    }

    return (
      <>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {result?.data?.teamMember.title}
            </h1>
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  {result?.data?.teamMember.bio}
                </p>
                <h2 className="text-4l sm:text-6l font-bold tracking-tight text-gray-900">
                  What makes {result?.data?.teamMember.title} different
                </h2>
                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  {result?.data?.teamMember.differentiation}
                </p>
                <h2 className="text-4l sm:text-6l font-bold tracking-tight text-gray-900">
                  Where {result?.data?.teamMember.title} makes an impact
                </h2>
                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  {result?.data?.teamMember.impact}
                </p>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <img
                  src={result?.data?.teamMember.pictureConnection.edges[0].node.url}
                  alt=""
                  className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
