import { blog } from '@xc/shared/clients/contentstack'
import GetPostsPageQuery from './queries/GetPostsPageQuery.graphql'

export type PostsPageData = {
  page: {
    title: string
    subtitle: string
    description: string
    open_graph: {
      og_title: string
      og_description: string
    }
  }
  posts: [
    {
      title: string
      url: string
      system: {
        created_at: string
      }
    },
  ]
}

export default async function getPostsPage(): Promise<Core.Result<PostsPageData>> {
  const response = await blog.gql.query({
    query: GetPostsPageQuery,
  })

  if (!response || response.error) {
    return { ok: false, error: 'Not Found' }
  }

  const item: PostsPageData = {
    page: response.data.page.items[0],
    posts: response.data.posts.items,
  }

  return { ok: true, data: item }
}
