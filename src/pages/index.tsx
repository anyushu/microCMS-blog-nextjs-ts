import type { InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import Container from 'components/atoms/Container'
import Heading from 'components/atoms/Heading'
import Posts from 'components/molecules/Posts'
import Hero from 'components/organisms/Hero'
import Layout from 'components/templates/Layout'
import { getBlogList } from 'libs/microcms/get-blog'

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<IndexProps> = ({ blog }) => {
  return (
    <>
      <>
        <NextSeo
          description="フロントエンドエンジニアのブログ。サッカーと映画が好きです。"
          canonical={process.env.NEXT_PUBLIC_SITE_URL}
        />

        <Layout>
          <Hero />
          <Container>
            <Heading h={2} className="mb-6 tracking-wider">
              Latest posts
            </Heading>
            <Posts blogs={blog.contents} />
            <div className="mt-12 text-center">
              <Link href="/page/[offset]" as="/page/1">
                <a>Show More</a>
              </Link>
            </div>
          </Container>
        </Layout>
      </>
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const data = await getBlogList(12)

  return {
    props: {
      blog: data,
    },
  }
}
