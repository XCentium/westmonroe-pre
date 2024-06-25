import { useEffect, useState } from 'react'
import EntryService from '@/common/datamigration/services/EntryService'
import { BlogPostEntry } from '@/common/datamigration/types/Entry'


let blogPostEntries: BlogPostEntry[]

const DataMigration = () => {
  useEffect(() => {
    getData()
  })

  const getData = async () => {
    await EntryService.createAnEntry().then((response: any) => {


      if (response != null && response.data != null) {


         response.map((post: any)  => {

          /*
          blogPostEntries.map(post => {
            title = post?.data?.
          })
          */
         })


      } else {
      }
    })
  }
  return (
    <>
      <h3>Data Migration</h3>
    </>
  )
}

export default DataMigration
