import type { InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import Layout from 'components/templates/Layout'
import { getBlogList } from 'libs/microcms/get-blog'

type BlogPostProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogPost: NextPage<BlogPostProps> = ({ blog }) => {
  return (
    <>
      <>
        <NextSeo description="フロントエンドエンジニア。サッカーと映画が好きです。" />

        <Layout>
          <></>
        </Layout>
      </>
    </>
  )
}

export default BlogPost

export const getStaticProps = async () => {
  const data = await getBlogList()

  return {
    props: {
      blog: data,
    },
  }
}
