import dynamic from 'next/dynamic'

const Search = dynamic(() => import('./search'))

export default Search
