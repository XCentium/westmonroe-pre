
'use client'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits, Pagination, Configure} from 'react-instantsearch'
import { HitComponent } from './HitComponent'
import settings from '@/common/settings'
import 'instantsearch.css/themes/satellite.css';


const searchClient = algoliasearch(settings.algolia.env.appId as string, settings.algolia.env.apiKey as string)

export default function Search() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={settings.algolia.indices.developmentIndex}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
      insights
    >
      <Configure hitsPerPage={30} />
      <SearchBox />
          <Hits hitComponent={HitComponent} />
          <Pagination showLast={true} showFirst={true} className="pagination"/>
    </InstantSearch>
  )
}
