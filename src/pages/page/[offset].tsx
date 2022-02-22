import type { InferGetStaticPropsType, NextPage, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import Container from '@/components/atoms/Container'
import Heading from '@/components/atoms/Heading'
import Posts from '@/components/organisms/Posts'
import { getBlogList, getAllSlugs } from '@/libs/microcms/get-blog'

const PAGE_LIMIT = 12

type BlogPostProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogPost: NextPage<BlogPostProps> = ({ blog }) => {
  return (
    <>
      <NextSeo noindex={true} canonical={process.env.NEXT_PUBLIC_SITE_URL} />

      <Container>
        <Heading h={2} className="mb-6 tracking-wider">
          Page {blog.offset + 1} / {Math.ceil(blog.totalCount / PAGE_LIMIT)}
        </Heading>
        <Posts
          blogs={blog.contents}
          pageInfo={{
            offset: blog.offset,
            limit: blog.limit,
            totalCount: blog.totalCount,
            pageLimit: PAGE_LIMIT,
          }}
        />
      </Container>
    </>
  )
}

export default BlogPost

export const getStaticPaths = async () => {
  const allPage = await getAllSlugs()
  const paths = [...Array(Math.ceil(allPage.totalCount / PAGE_LIMIT))].map((_, i) => ({
    params: {
      offset: (i + 1).toString(),
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ offset: string }>) => {
  const data = await getBlogList(PAGE_LIMIT, Number(params?.offset) - 1)
  return {
    props: {
      blog: data,
    },
  }
}
