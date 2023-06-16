import Head from 'next/head'
import React from 'react'

interface HeadComponentProps {
  title: string
}

export const HeadComponent: React.FC<HeadComponentProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" href="/favicon.ico" />

      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="bingbot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
    </Head>
  )
}
