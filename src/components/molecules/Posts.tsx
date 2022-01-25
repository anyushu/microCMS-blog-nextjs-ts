import { FC } from 'react'
import PostCard from 'components/organisms/post/PostCard'
import type { blog } from 'types/cms-types'

const Posts: FC<{ blogs: blog[] }> = ({ blogs }) => {
  return (
    <div id="posts" className="grid gap-8 md:grid-cols-3 md:gap-4">
      {blogs.map((blog) => {
        return <PostCard key={blog.id} blog={blog} />
      })}
    </div>
  )
}

export default Posts
