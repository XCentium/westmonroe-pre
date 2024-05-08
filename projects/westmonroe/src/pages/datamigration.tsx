import { useEffect, useState } from 'react'
import EntryService from '@/common/datamigration/services/EntryService'
import { entry } from '@/common/datamigration/types/Entry'

const DataMigration = () => {
  useEffect(() => {
    getData()
  })

  const getData = async () => {
    let setEntryData: entry = { title: '', locale: '', uid: '', url: '' }
    await EntryService.createAnEntry().then((response: any) => {
      if (response != null && response.ok == true && response.data != null) {
        setEntryData.title = response.data.title
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
