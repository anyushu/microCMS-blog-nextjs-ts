import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import GoogleTagManager from '@/components/templates/GoogleTagManager'
import Layout from '@/components/templates/Layout'
import { defaultSeo } from '@/libs/next-seo.config'
import { GTM_ID } from '@/utils/gtm'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <DefaultSeo {...defaultSeo} />
      {GTM_ID && <GoogleTagManager googleTagManagerId={GTM_ID} />}

      <ThemeProvider attribute="class" defaultTheme="light" storageKey="anyushu-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  )
}

export default MyApp
