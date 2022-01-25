import Link from 'next/link'
import { FC } from 'react'
import { Twemoji } from 'react-emoji-render'
import { blog } from 'types/cms-types'
import { getPostLink } from 'utils/blog-helpers'
import { formatDate } from 'utils/format-date'

const PostCard: FC<{ blog: blog }> = ({ blog }) => {
  return (
    <Link href="/posts/[slug]" as={getPostLink(blog.id)} passHref>
      <a className="hover:opacity-75 transition-all">
        {/* thumbnail */}
        <figure className="relative pt-[46.29%] h-0 bg-gray-100">
          <Twemoji
            className="absolute inset-0 m-auto w-16 h-16 text-7xl"
            onlyEmojiClassName="twemoji"
            svg
            text={blog.thumbnail || '☕'}
          />
        </figure>
        <div className="flex justify-between items-center my-6 text-xs tracking-widest text-gray-500">
          {/* tag */}
          <div>{blog.category[0] && <span>{blog.category[0]}</span>}</div>
          {/* created_time */}
          <time dateTime={formatDate(blog.createdAt)}>{formatDate(blog.createdAt)}</time>
        </div>
        {/* title */}
        <h2 className="text-lg tracking-wider">{blog.title}</h2>
      </a>
    </Link>
  )
}

export default PostCard
