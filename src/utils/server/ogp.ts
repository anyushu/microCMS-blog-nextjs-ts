import fs from 'fs'
import path from 'path'
import { createCanvas, registerFont, loadImage } from 'canvas'

export const size = { width: 1200, height: 630 }

const createOgp = async (title: string, id: string): Promise<void> => {
  const DX = 0 as const
  const DY = 0 as const
  const canvas = createCanvas(size.width, size.height)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(DX, DY, size.width, size.height)

  const imageSrc = path.resolve('./src/utils/server/assets/bg-ogp.png')
  const bgImage = await loadImage(fs.readFileSync(imageSrc))
  ctx.drawImage(bgImage, 0, 0, size.width, size.height)

  registerFont(
    path.resolve('./src/utils/server/assets/fonts/Noto_Sans_JP/NotoSansJP-Regular.otf'),
    {
      family: 'Noto Sans JP',
    },
  )
  ctx.font = '48px Noto Sans JP'
  ctx.fillStyle = '#000000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${title}`, 600, 300)

  const buffer = canvas.toBuffer()

  fs.writeFileSync(path.resolve(`./public/ogp/${id}.png`), buffer)
}

export default createOgp
