import Result from '@xc/lib/src/Result'
import { westMonroe } from '@xc/shared/src/clients/contentstack'
import GetNewsArticles from './queries/GetNewsArticlesQuery.graphql'

export type NewsArticlesData = {
  newsArticles: NewsArticle[]
}
export type NewsArticle = {
  title: string
  name: string
  date: string
  url: string
  system: {
    uid: string
  }
  summary_info: {
    summary_title: string
    summary_imageConnection: {
      edges: [
        {
          node: {
            title: string
            url: string
          }
        },
      ]
    }
  }
}
export default async function getNewsArticles(): Promise<Result<NewsArticlesData>> {
  const response = await westMonroe.gql.query({
    query: GetNewsArticles,
  })
  if (!response || response.error) {
    return Result.fail('Not Found')
  }

  const item: NewsArticlesData = {
    newsArticles: response.data['all_news_article']['items'],
  }
  return Result.success(item)
}
