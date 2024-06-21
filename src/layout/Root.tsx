import type { RootLayoutData } from '@xc/shared/src/data/westmonroe/getRootLayout'

import Header from './Header'

export default function Root({
  data,
  children,
}: {
  data: RootLayoutData | null | undefined
  children: React.ReactNode
}) {
  return (
    <>
      <Header data={data} />
      {children}
      <div></div>
    </>
  )
}
