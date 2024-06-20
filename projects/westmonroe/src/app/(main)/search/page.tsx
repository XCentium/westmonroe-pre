import Search from '@/common/algolia/search'


export default async function Page({}: Core.Page<{ path: string }>) {

  return (
    <>
    <div className="bg-white">
    <Search />
    </div>
    </>
  )
}
