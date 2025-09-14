import { createOpengraphImage } from '@kanagawa-rifle/website/service/OpenGraphService'

import { info } from './info'

const og = createOpengraphImage(info.title)

export const alt = og.alt
export const size = og.size
export default async function Image() {
  return await og.image()
}
