import type { GetStaticPropsContext, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import Button from 'components/atoms/Button'
import Container from 'components/atoms/Container'
import PostHeader from 'components/organisms/post/PostHeader'
import Layout from 'components/templates/Layout'
import { getAllSlugs, getPreiewBlog } from 'libs/microcms/get-blog'
import { blog } from 'types/cms-types'
import { HTMLToReact } from 'utils/html-to-react-parser'

type BlogPostProps = {
  blog: blog
}

const BlogPost: NextPage<BlogPostProps> = ({ blog }) => {
  const blogBodyContent = HTMLToReact({
    html: blog.content,
  })

  return (
    <>
      <NextSeo title={`プレビュー | ${blog.title}`} noindex={true} />

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

export const getStaticProps = async ({
  params,
  preview,
  previewData,
}: GetStaticPropsContext<{ slug: string }, { draftKey: string }>) => {
  if (preview && previewData && params?.slug) {
    const draftKey = previewData.draftKey
    const data = await getPreiewBlog(params.slug, draftKey)
    return {
      props: {
        blog: data,
      },
    }
  } else {
    return { notFound: true }
  }
}
