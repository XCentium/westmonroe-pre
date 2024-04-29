import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getGenericPage from '@xc/shared/data/blog/getGenericPage'
import getMengEntry from '@xc/shared/data/blog/getMengEntry'

import Contentstack from '@xc/ui/Contentstack'
import HeroSection from '@xc/ui/HeroSection'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(({ params }) => {
  return getMengEntry({ path: `/${params.path}` })
})

export default async function Page({ params, searchParams }: Core.Page<{ path: string }>) {
  const result = await getMengEntry({ path: `/${params.path}`, preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  return (
    <>
      <div>{result.data?.title}</div>
      <div>{result.data?.url}</div>
      <div>{result.data?.firstname}</div>
      {/* <Contentstack.ModularBlocks
        entries={result.data.modular_blocks_main}
        components={{
          hero_section: HeroSection,
        }}
      /> */}
    </>
  )
}
