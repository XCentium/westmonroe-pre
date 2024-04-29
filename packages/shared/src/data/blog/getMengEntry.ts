import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { createClient } from '@xc/shared/clients/contentstack'

export type MengPageData = Contentstack.Item<{
  title: string,
  url: string,
  firstname: string,
  modular_blocks_main: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getMengEntry({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<MengPageData>> {
  var client = createClient();
  const result = await client.api.find<MengPageData>('meng', preview, (query) => {
    return query.where('url', path).toJSON()
  })

  if (!result.ok) {
    return Result.from(result)
  }

  const item = result.data?.shift()

  if (!item) {
    return Result.fail('Not Found')
  }

  return Result.success(item)
}
