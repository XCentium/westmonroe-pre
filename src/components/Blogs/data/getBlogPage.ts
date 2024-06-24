import Result from '@xc/lib/src/Result'
import { westMonroe } from '@xc/shared/src/clients/contentstack'
import GetBlogPageQuery from './queries/GetBlogPageQuery.graphql'

export type BlogPageData = {
  blogPage: {
    title: string
    posted_on: string,
    read_time: string,
    body:string,
    author_name:string,
    featured_imageConnection:{
      edges:[
        {
          node:{
            title:string,
            url:string
          }
        }
      ]
    }
  }
}

export default async function getBlogPage(): Promise<Result<BlogPageData>> {
  const response = await westMonroe.gql.query({
    query: GetBlogPageQuery,
  })
  if (!response || response.error) {
    return Result.fail('Not Found')
  }

  const item: BlogPageData = {
    blogPage: response.data["blog_post"]
  }
  return Result.success(item)
}
