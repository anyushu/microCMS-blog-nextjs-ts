import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import GoogleTagManager from '@/components/templates/GoogleTagManager'
import Layout from '@/components/templates/Layout'
import { defaultSeo } from '@/next-seo.config'
import { GTM_ID } from '@/utils/gtm'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" storageKey="anyushu-theme">
      <Layout>
        <DefaultSeo {...defaultSeo} />
        {GTM_ID && <GoogleTagManager googleTagManagerId={GTM_ID} />}
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
