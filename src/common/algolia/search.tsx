'use client'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Configure,
  RefinementList,
  DynamicWidgets,
} from 'react-instantsearch'
import { Hit } from './comps/Hit'
import settings from '@/common/settings'
import 'instantsearch.css/themes/satellite.css'
import { singleIndex } from 'instantsearch.js/es/lib/stateMappings'
import { useSearchParams } from 'next/navigation'
import { Panel } from './comps/Panel'
const searchClient = algoliasearch(settings.algolia.env.appId as string, settings.algolia.env.apiKey as string)

export default function Search() {
  const searchParams = useSearchParams()
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={settings.algolia.indices.developmentIndex}
      routing={{ stateMapping: singleIndex(settings.algolia.indices.developmentIndex) }}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
      insights
    >
      <Configure hitsPerPage={30} />
      <SearchBox />
      <DynamicWidgets facets={[]}>
        <Panel header="Office">
          <RefinementList attribute="office.name" searchable={false} showMore={false} />
        </Panel>
      </DynamicWidgets>
      <Hits hitComponent={Hit} />
      <Pagination showLast={true} showFirst={true} className="pagination" />
    </InstantSearch>
  )
}
