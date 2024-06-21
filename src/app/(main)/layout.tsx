import Contentstack from '@xc/ui/Contentstack'

export default async function Layout({ children }: Core.Layout) {
  return (
    <>
      <Contentstack.LivePreview>{children}</Contentstack.LivePreview>
    </>
  )
}