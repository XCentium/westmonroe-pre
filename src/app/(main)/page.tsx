import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/src/createMetadataGenerator'
import getHomePage from '@xc/shared/src/data/westmonroe/getHomePage'

import HeroSection from '@/components/HeroSection'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(() => {
  return getHomePage({})
})

export default async function Page({ searchParams }: Core.Page) {
  const result = await getHomePage({ preview: searchParams })

  if (!result.ok || !result.data) {
    return notFound()
  }

  return (
    <>
      <HeroSection data={result.data.hero_section} />
    </>
  )
}
