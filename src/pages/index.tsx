import type { InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
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
        <NextSeo description="フロントエンドエンジニア。サッカーと映画が好きです。" />

        <Layout>
          <Hero />
          <Container>
            <Heading h={2} className="mb-6 tracking-wider">
              Latest posts
            </Heading>
            <Posts blogs={blog.contents} />
          </Container>
        </Layout>
      </>
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const data = await getBlogList()

  return {
    props: {
      blog: data,
    },
  }
}
