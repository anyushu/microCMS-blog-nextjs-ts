import cheerio from 'cheerio'
import hljs from 'highlight.js'
import parse from 'html-react-parser'
import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import 'highlight.js/styles/atom-one-dark.css'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import { Twemoji } from 'react-emoji-render'
import {
  FacebookShareButton,
  HatenaShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share'
import Button from 'components/atoms/Button'
import Container from 'components/atoms/Container'
import PostHeader from 'components/molecules/post/PostHeader'
import Layout from 'components/templates/Layout'
import { options } from 'libs/html-to-react-parser'
import { getAllSlugs, getBlog } from 'libs/microcms/get-blog'
import { siteTitle } from 'next-seo.config'
import createOgp from 'utils/server/ogp'

type BlogPostProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogPost: NextPage<BlogPostProps> = ({ blog, blogBody }) => {
  const blogTitle = blog.title + ' | ' + siteTitle
  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`

  return (
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

          {/* SocialShare */}
          <div className="text-center md:mt-24 mt-16">
            <p className="flex justify-center items-center mb-6">
              <Twemoji text="📎" />
              <span className="tracking-widest text-lg ml-1">Social Share</span>
            </p>
            <div className="flex justify-center items-center flex-wrap">
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

          <div className="md:mt-24 mt-16 tracking-widest text-center">
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
  const $ = cheerio.load(data.contents[0].content, null, false)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
  void createOgp(data.contents[0].title, data.contents[0].id)
  return {
    props: {
      blog: data.contents[0],
      blogBody: $.html(),
    },
  }
}
