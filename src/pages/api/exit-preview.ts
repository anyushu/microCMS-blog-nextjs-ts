import type { NextApiRequest, NextApiResponse } from 'next'

const exitPreview = async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.clearPreviewData()
  res.end()
  window.close()
}

export default exitPreview
