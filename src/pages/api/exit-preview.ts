import type { NextApiRequest, NextApiResponse } from 'next'

const exitPreview = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.clearPreviewData()
  res.writeHead(307, { Location: `/blog/${req.query.id}` })
  res.end('exit preview mode')
}

export default exitPreview
