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

      <p></p>
      <h2>{result.data?.blogPage?.title}</h2>
      <img src = {result?.data?.blogPage?.featured_imageConnection["edges"][0].node.url}></img>
      <p>{result?.data?.blogPage?.author_name}</p>
      <div>{result.data?.blogPage?.body}</div>

      {/* <Contentstack.ModularBlocks
        entries={result.data.modular_blocks_main}
        components={{
          hero_section: HeroSection,
        }}
      /> */}
    </>
  )
}
