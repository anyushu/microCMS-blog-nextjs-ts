import cheerio from 'cheerio'
import hljs from 'highlight.js'
import parse from 'html-react-parser'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Container from 'components/atoms/Container'
import PostHeader from 'components/molecules/post/PostHeader'
import Layout from 'components/templates/Layout'
import { options } from 'libs/html-to-react-parser'
import { getPreiewBlog } from 'libs/microcms/get-blog'
import { blog } from 'types/cms-types'
import 'highlight.js/styles/atom-one-dark.css'

type BlogPostProps = {
  blog: blog
  blogBody: string
}

const BlogPost: NextPage<BlogPostProps> = ({ blog, blogBody }) => {
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
              <>{parse(blogBody, options)}</>
            </div>
          </article>
        </Container>
      </Layout>
    </>
  )
}

export default BlogPost

export const getServerSideProps = async ({
  params,
  preview,
  previewData,
}: GetServerSidePropsContext<{ slug: string }, { draftKey: string }>) => {
  if (preview && previewData && params?.slug) {
    const draftKey = previewData.draftKey
    const data = await getPreiewBlog(params.slug, draftKey)
    const $ = cheerio.load(data.content)
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text())
      $(elm).html(result.value)
      $(elm).addClass('hljs')
    })
    return {
      props: {
        blog: data,
        blogBody: $.html(),
      },
    }
  } else {
    return { notFound: true }
  }
}
