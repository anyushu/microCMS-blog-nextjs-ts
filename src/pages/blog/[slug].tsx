import type { ParsedUrlQuery } from 'querystring'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
import parse from 'html-react-parser'
import type { GetStaticPropsContext, NextPage } from 'next'
import 'highlight.js/styles/atom-one-dark.css'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import { Twemoji } from 'react-emoji-render'
import {
  FacebookShareButton,
  HatenaShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share'
import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import PostHeader from '@/components/molecules/post/PostHeader'
import { options } from '@/libs/html-to-react-parser'
import { getBlog, getBlogList } from '@/libs/microcms/get-blog'
import { siteTitle } from '@/libs/next-seo.config'
import { blog } from '@/types/cms-types'
import createOgp from '@/utils/server/ogp'

interface BlogPostProps {
  blog: blog
  blogBody: string
  isPreview: boolean
}

interface Params extends ParsedUrlQuery {
  slug: string
}

interface PreviewData extends ParsedUrlQuery {
  draftKey?: string
}

const BlogPost: NextPage<BlogPostProps> = ({ blog, blogBody, isPreview }) => {
  const blogTitle = blog.title + ' | ' + siteTitle
  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.id}`

  return (
    <>
      {isPreview ? (
        <NextSeo title={blog.title} noindex={true} />
      ) : (
        <>
          <NextSeo
            title={blog.title}
            description={blog.metaDescription}
            noindex={blog.metaRobots}
            openGraph={{
              url: blogUrl,
              title: blogTitle,
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
          <ArticleJsonLd
            type="Blog"
            url={blogUrl}
            title={blogTitle}
            images={[`${process.env.NEXT_PUBLIC_SITE_URL}/ogp/${blog.id}.png`]}
            datePublished={blog.createdAt}
            dateModified={blog.updatedAt}
            authorName={['Anyushu']}
            publisherName="Anyushu"
            description={blog.metaDescription}
          />
        </>
      )}

      <Container>
        <article>
          {isPreview && (
            <div className="text-right">
              <Button href={`/api/exit-preview?id=${blog.id}`}>プレビューを解除</Button>
            </div>
          )}
          <PostHeader blog={blog} />
          <div
            id="news-content"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="mt-12 w-full max-w-none tracking-wider leading-relaxed prose prose-slate dark:prose-invert md:px-24 md:mt-24 lg:prose-lg md:prose-md"
          >
            <>{parse(blogBody, options)}</>
          </div>
        </article>
        {!isPreview && (
          <>
            <div className="mt-16 text-center md:mt-24">
              <p className="flex justify-center items-center mb-6">
                <Twemoji text="📎" />
                <span className="ml-1 text-lg tracking-widest">Social Share</span>
              </p>
              <div className="flex flex-wrap justify-center items-center">
                <TwitterShareButton url={blogUrl} className="mx-3">
                  <span className="hover:underline">Twitter</span>
                </TwitterShareButton>
                <HatenaShareButton url={blogUrl} className="mx-3">
                  <span className="hover:underline">Hatena</span>
                </HatenaShareButton>
                <FacebookShareButton title={blogTitle} url={blogUrl} className="mx-3">
                  <span className="hover:underline">Facebook</span>
                </FacebookShareButton>
                <PocketShareButton url={blogUrl} className="mx-3">
                  <span className="hover:underline">Pocket</span>
                </PocketShareButton>
              </div>
            </div>
            <div className="mt-16 tracking-widest text-center md:mt-24">
              <Button href="/">Back Home</Button>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export default BlogPost

export const getStaticPaths = async () => {
  const allPage = await getBlogList(9999)
  const paths = allPage.contents.map((blog) => ({
    params: {
      slug: blog.id,
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext<Params, PreviewData>) => {
  const { params, previewData } = context
  const data = await getBlog(params?.slug || '', previewData?.draftKey)
  const isPreview = previewData?.draftKey ? true : false

  const $ = cheerio.load(data.content, null, false)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  if (!isPreview) {
    await createOgp(data.title, data.id)
  }

  return {
    props: {
      blog: data,
      blogBody: $.html(),
      isPreview: isPreview,
    },
  }
}
