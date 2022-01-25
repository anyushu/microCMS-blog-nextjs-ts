import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import Button from 'components/atoms/Button'
import Container from 'components/atoms/Container'
import PostHeader from 'components/organisms/post/PostHeader'
import Layout from 'components/templates/Layout'
import { getAllSlugs, getBlog } from 'libs/microcms/get-blog'

type BlogPostProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogPost: NextPage<BlogPostProps> = ({ blog }) => {
  return (
    <>
      <NextSeo title={blog.title} />

      <Layout>
        <Container>
          <article>
            <PostHeader blog={blog} />
            <div
              id="news-content"
              className="w-full max-w-none prose mt-12 tracking-wider leading-relaxed md:px-24 md:mt-24"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
          <div className="mt-12 tracking-widest text-center">
            <Button href="/">Back Home</Button>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default BlogPost

export const getStaticPaths = async () => {
  const allPage = await getAllSlugs()
  const paths = allPage.contents.map((blog) => ({
    params: {
      id: blog.id,
      slug: blog.slug,
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ id: string; slug: string }>) => {
  const data = await getBlog(params?.id || '')

  return {
    props: {
      blog: data.contents[0],
    },
  }
}
