import algoliasearch from 'algoliasearch'
import settings from '@/common/settings'

export const searchClient = algoliasearch(settings.algolia.env.appId as string, settings.algolia.env.apiKey as string);


