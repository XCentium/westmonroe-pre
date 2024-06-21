import Result from '@/core/result'
import settings from '@/common/settings'
import axios from 'axios'
import posts from '../services/data/news_articles_data.json'
const createAnEntry = async () => {
  const origin = 'https://' + settings.contentstack.env.apiHost
  const pathname = settings.contentstack.entries.news_article_entries
  const url = origin + pathname

  const options = {
    headers: {
      'Content-Type': 'application/json',
      authtoken: settings.contentstack.env.authToken,
      authorization: settings.contentstack.env.authorization,
      api_key: settings.contentstack.env.apikey,
    },
  }

  try {
    await Promise.all(
      posts.map((post) =>
        axios.post<Response[]>(
          url,
          {
            entry: post,
          },
          options,
        ),
      ),
    ).then(
      (response) => {
        console.log('response is', response)
        return Result.success(response)
      },
      (error) => {
        return Result.fail(error)
      },
    )
  } catch (error) {
    return Result.fail('fail')
  }
}
const EntryService = {
  createAnEntry
}

export default EntryService
