import Result from '@xc/lib/Result'
import { westMonroe } from '@xc/shared/clients/contentstack'
import GetNewsArticleDetails from './queries/GetNewsArticleDetailsQuery.graphql'

export type NewsArticleDetails = {
  newsArticle: {
    title: string
    name: string
    date: string
    hide_x_minutes_to_read: boolean
    time_to_read_override: string
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
      global_field: {
        meta_title: string
        meta_description: string
      }
      url: string
    }
    modules: [
      {
        __typename: string
        richtext: {
          __typename: string
          use_plain_text_styling: boolean
          rich_text_editor: string
          is_quote: boolean
        }
      },
    ]
    fullWidthImageModules: [
      {
        __typename: string

        image_full_width: {
          fullwidth: boolean
          boolean: boolean
          caption: string
          headline: string
          inline: boolean
        }
      },
    ]
  }
}
export default async function getNewsArticleDetails(uid: string): Promise<Result<NewsArticleDetails>> {
  console.log('uide form here', uid)
  const response = await westMonroe.gql.query({
    query: GetNewsArticleDetails,
    variables: {
      uid: uid,
    },
  })
  if (!response || response.error) {
    return Result.fail('Not Found')
  }

  const item: NewsArticleDetails = {
    newsArticle: response.data['news_article'],
  }
  return Result.success(item)
}
