import { NextResponse } from 'next/server'
import logger from '@xc/lib/src/logger/server'
import { toSitemapXML } from '@xc/lib/src/sitemap'
import getSitemapItems from '@xc/shared/src/data/westmonroe/getSitemapItems'

export { dynamic, revalidate } from '@/ssr'

export async function GET() {
  const result = await getSitemapItems()
  const items = result.data ?? []
  const xml = toSitemapXML(items)

  if (!result.ok) {
    logger.error(result, 'Internal API: Sitemap')
  } else {
    logger.info('Internal API: The sitemap was generated')
  }

  return new NextResponse(xml, {
    headers: {
      [`content-type`]: 'application/xml',
    },
  })
}
