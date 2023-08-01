import { NextResponse } from 'next/server'
import logger from '@xc/lib/logger'
import { toSitemapXML } from '@xc/lib/sitemap'
import getSitemapItems from '@xc/shared/data/blog/getSitemapItems'
import settings from '@/settings'

export const revalidate = settings.revalidate

export const dynamic = 'force-static'

export async function GET() {
  const result = await getSitemapItems()
  const items = result.data ?? []
  const xml = toSitemapXML(items)

  if (!result.ok) {
    logger.error(result, 'Internal API: Sitemap')
  }

  logger.info('Internal API: The Sitemap was generated')

  return new NextResponse(xml, {
    headers: {
      [`content-type`]: 'application/xml',
    },
  })
}
