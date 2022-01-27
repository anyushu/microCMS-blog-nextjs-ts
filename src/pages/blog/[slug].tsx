import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import Button from 'components/atoms/Button'
import Container from 'components/atoms/Container'
import PostHeader from 'components/organisms/post/PostHeader'
import Layout from 'components/templates/Layout'
import { getAllSlugs, getBlog } from 'libs/microcms/get-blog'
import { HTMLToReact } from 'utils/html-to-react-parser'
import createOgp from 'utils/server/ogp'

type BlogPostProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogPost: NextPage<BlogPostProps> = ({ blog }) => {
  const blogBodyContent = HTMLToReact({
    html: blog.content,
  })

  return (
    <>
      <NextSeo
        title={blog.title}
        description={blog.metaDescription}
        noindex={blog.metaRobots}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`,
          title: blog.title,
          description: blog.metaDescription,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/ogp/${blog.id}.png`,
              width: 1200,
              height: 630,
              alt: blog.title,
              type: 'image/png',
            },
          ],
          site_name: process.env.NEXT_PUBLIC_SITE_NAME,
        }}
      />

      <Layout>
        <Container>
          <article>
            <PostHeader blog={blog} />
            <div
              id="news-content"
              className="w-full max-w-none prose prose-slate md:prose-md lg:prose-lg mt-12 tracking-wider leading-relaxed md:px-24 md:mt-24 dark:prose-invert"
            >
              {blogBodyContent}
            </div>
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
      slug: blog.slug,
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  const data = await getBlog(params?.slug || '')
  void createOgp(data.contents[0].title, data.contents[0].id)
  return {
    props: {
      blog: data.contents[0],
    },
  }
}
