import 'highlight.js/styles/atom-one-dark.css'
import { Element, HTMLReactParserOptions } from 'html-react-parser'
import Image from 'next/image'
import React from 'react'

export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element

    if (typedDomNode.name === 'img') {
      const imgSrc = new URL(typedDomNode.attribs.src)
      const params = imgSrc.searchParams
      const imgWidth = params.get('w') ? Number(params.get('w')) : 1000
      const imgHeight = params.get('h') ? Number(params.get('h')) : 672
      return (
        <Image
          src={typedDomNode.attribs.src}
          alt={typedDomNode.attribs.alt}
          width={imgWidth}
          height={imgHeight}
        />
      )
    }

    if (typedDomNode.name === 'iframe' && typedDomNode.attribs.title == 'YouTube embed') {
      return (
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            paddingBottom: '56.25%',
            marginBottom: '1.25rem',
            width: '100%',
            height: '0',
          }}
        >
          <iframe
            src={typedDomNode.attribs.src}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              border: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )
    }

    return false
  },
}
