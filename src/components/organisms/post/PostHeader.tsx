import { FC } from 'react'
import Heading from 'components/atoms/Heading'
import { blog } from 'types/cms-types'
import { formatDate } from 'utils/format-date'
import { jpParse } from 'utils/japanese-parser'

const PostHeader: FC<{ blog: blog }> = ({ blog }) => {
  return (
    <>
      {/* title */}
      <div id="post-title" className="mb-6">
        <Heading h={2} className="tracking-wider leading-relaxed">
          {jpParse(blog.title)}
        </Heading>
      </div>
      <div className="flex items-center">
        {/* tag */}
        {blog.category.length > 0 && <p className="text-gray-500">{blog.category[0]}</p>}
        {/* date */}
        <time className="ml-6 text-gray-500" dateTime={formatDate(blog.createdAt)}>
          {formatDate(blog.createdAt)}
        </time>
      </div>
    </>
  )
}

export default PostHeader
