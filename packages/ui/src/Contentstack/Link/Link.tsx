import type { HTMLAttributes } from 'react'
import type { ModularBlock } from '@xc/ui/Contentstack'

import Raw from 'next/link'
import { tags } from '@xc/ui/Contentstack'

export default function Link({
  data,
  ...props
}: Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> & ModularBlock<Contentstack.Fields.Link>) {
  if (!data?.title || !data.href) return null

  return (
    <Raw href={data.href} {...props} {...tags(data, 'href')}>
      {data.title}
    </Raw>
  )
}
