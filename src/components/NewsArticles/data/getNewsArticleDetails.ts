import Result from '@xc/lib/Result'
import { westMonroe } from '@xc/shared/clients/contentstack'
import GetNewsArticleDetails from './queries/GetNewsArticleDetailsQuery.graphql'

export type RichText = {
  __typename: string
  use_plain_text_styling: boolean
  content: string
  is_quote: boolean
}

export type FullWidthImage = {
  headline: string
  imageConnection: {
    edges: [
      {
        node: {
          title: string
          url: string
        }
      },
    ]
  }
  full_bleed: boolean
  no_max_height: boolean
  caption: string
}

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
      meta_tags: {
        meta_title: string
        meta_description: string
      }
      url: string
    }
    modular_blocks: [
      {
        __typename: string
        rich_text: RichText
        image_full_width: FullWidthImage
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
