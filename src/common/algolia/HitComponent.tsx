import { Highlight } from 'react-instantsearch-hooks-web'

import type { Hit } from 'instantsearch.js'
import type { SearchItem } from './types/SearchItem'
import 'instantsearch.css/themes/satellite.css'

type HitComponentProps = {
  hit: Hit<SearchItem>
}

export function HitComponent({ hit }: HitComponentProps) {
  return (
    <div className="group relative order-last" key={hit.objectID}>
      <div key={hit.title} className="group relative flex justify-between">
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none h-40 w-40 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
          <a href={hit.url + '?uid=' + hit.uid}>
            <img src={hit.picture?.url} alt={hit.picture?.title} />
          </a>
        </div>
        <div className="grid grid-rows-2 ml-5">
          <div className="... row-span-1">
            <h3 className="row-span-1 text-lg font-semibold">
              <a href={hit.url + '?uid=' + hit.uid}>
                <h3>{hit.title}</h3>
              </a>
            </h3>
          </div>
          <div className="... row-span-2">
            <p>{hit.short_bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
