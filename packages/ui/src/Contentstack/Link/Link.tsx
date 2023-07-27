import type { HTMLAttributes } from 'react'
import type { ModularBlock } from '@xc/ui/ModularBlocks'

import NextLink from 'next/link'

export default function Link({
  data,
  ...props
}: Omit<HTMLAttributes<HTMLAnchorElement>, 'title' | 'href'> & ModularBlock<Contentstack.Fields.Link>) {
  if (!data?.title || !data.href) return null

  return (
    <NextLink href={data.href} {...props}>
      {data.title}
    </NextLink>
  )
}