import { notFound } from 'next/navigation'
import createMetadataGenerator from '@xc/lib/createMetadataGenerator'
import getBlogPage, { BlogPageData } from '@/components/Blogs/data/getBlogPage'

export { dynamic, revalidate } from '@/ssr'

export const generateMetadata = createMetadataGenerator(() => {
  return getBlogPage().then(({ ok, error, data }) => {
    return { ok, error, data: data?.blogPage }
  })
})

export default async function Page({}: Core.Page<{ path: string }>) {
  const result = await getBlogPage()

  if (!result.ok || !result.data) {
    return notFound()
  }
  console.log("result is---", result?.data?.blogPage)
  return (
    <>
      <div>{result?.data?.blogPage?.author_name}</div>
      <div>{result.data?.blogPage?.body}</div>
      <div>{result.data?.blogPage?.title}</div>
      {/* <Contentstack.ModularBlocks
        entries={result.data.modular_blocks_main}
        components={{
          hero_section: HeroSection,
        }}
      /> */}
    </>
  )
}
