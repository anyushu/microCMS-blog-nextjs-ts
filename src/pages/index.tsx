import type { InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import Layout from 'components/templates/Layout'
import { getBlogList } from 'libs/microcms/get-blog'

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<IndexProps> = ({ blog }) => {
  return (
    <>
      <NextSeo title="トップページ" />
      <Layout>Hello World !</Layout>
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
