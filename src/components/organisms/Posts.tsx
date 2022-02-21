import Link from 'next/link'
import { FC } from 'react'
import PostCard from '@/components/molecules/post/PostCard'
import type { blog } from '@/types/cms-types'

type PostsProps = {
  blogs: blog[]
  pageInfo?: {
    limit: number
    offset: number
    totalCount: number
    pageLimit: number
  }
}

const Posts: FC<PostsProps> = ({ blogs, pageInfo }) => {
  return (
    <>
      <div id="posts" className="grid gap-8 md:grid-cols-3 md:gap-4">
        {blogs.map((blog) => {
          return <PostCard key={blog.id} blog={blog} />
        })}
      </div>

      {pageInfo && (
        <div className="container mt-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            {pageInfo.offset > 0 && (
              <Link href="/page/[offset]" as={`/page/${pageInfo.offset}`}>
                <a>{'<'} Prev</a>
              </Link>
            )}
            {pageInfo.totalCount / pageInfo.pageLimit > pageInfo.offset + 1 && (
              <Link href="/page/[offset]" as={`/page/${pageInfo.offset + 2}`}>
                <a className="ml-auto">Next {'>'}</a>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Posts
