import type { Metadata } from 'next'

import PageHeader from '@kanagawa-rifle/website/components/PageHeader'
import { createMetadata, defaultPageInfo, PageInfo } from '@kanagawa-rifle/website/site'

const info: PageInfo = {
  ...defaultPageInfo,
  title: '404 NOT FOUND',
  description: `
指定されたページが見つかりませんでした。
`,
}
export const metadata: Metadata = createMetadata(info)

export default function Page() {
  return (
    <>
      <PageHeader title={info.title} description={info.description} />
    </>
  )
}
