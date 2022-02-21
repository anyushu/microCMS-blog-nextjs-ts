import type { NextApiRequest, NextApiResponse } from 'next'
import { getBlog } from '@/libs/microcms/get-blog'

const Preview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.slug) {
    return res.status(404).end()
  }

  const content = await getBlog(req.query.slug as string, req.query.draftKey as string)
    .then()
    .catch((reason) => console.error(reason))

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  })
  res.writeHead(307, { Location: `/blog/preview/${content.id}` })
  res.end('Preview mode enabled')
}

export default Preview
