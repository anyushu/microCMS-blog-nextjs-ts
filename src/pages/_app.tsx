import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import GoogleTagManager from 'components/templates/GoogleTagManager'
import { defaultSeo } from 'next-seo.config'
import { GTM_ID } from 'utils/gtm'
import 'styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_APP_ENV === 'production' && (
          <Script
            async={true}
            strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2260370577246692"
            crossOrigin="anonymous"
          />
        )}
      </Head>
      <DefaultSeo {...defaultSeo} />
      {GTM_ID && <GoogleTagManager googleTagManagerId={GTM_ID} />}

      <ThemeProvider attribute="class" defaultTheme="light" storageKey="anyushu-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
