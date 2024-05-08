import Result from '@/core/result'
import settings from '@/common/settings'
import axios from 'axios'
import { createdEntryData, entry } from '../types/Entry'

const createAnEntry = async () => {
  const origin = 'https://' + settings.contentstack.env.apiHost
  const pathname = settings.contentstack.entries.blog_post_entries
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
    const result = await axios.post<createdEntryData>(
      url,
      {
        entry: {
          title: 'This is a blog',
          author_name: 'Bartee Natarajan',
        },
      },
      options,
    )

    if (result?.status == 201) {
      console.log('Result is', result?.data?.entry)
      return Result.success(result?.data?.entry)
    } else {
      console.log('in-error')
      return Result.fail('fail')
    }
  } catch (error) {
    return Result.fail('fail')
  }

}
const EntryService = {
  createAnEntry,
}

export default EntryService
