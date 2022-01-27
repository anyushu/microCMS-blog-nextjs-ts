import fs from 'fs'
import path from 'path'
import { createCanvas, registerFont } from 'canvas'

const createOgp = async (title: string, id: string): Promise<void> => {
  const WIDTH = 1200 as const
  const HEIGHT = 630 as const
  const DX = 0 as const
  const DY = 0 as const
  const canvas = createCanvas(WIDTH, HEIGHT)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(DX, DY, WIDTH, HEIGHT)

  registerFont(path.resolve('./src/styles/fonts/Noto_Sans_JP/NotoSansJP-Regular.otf'), {
    family: 'Noto Sans JP',
  })
  ctx.font = '54px Noto Sans JP'
  ctx.fillStyle = '#000000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${title}`, 600, 300)

  const buffer = canvas.toBuffer()

  fs.writeFileSync(path.resolve(`./public/ogp/${id}.png`), buffer)
}

export default createOgp
