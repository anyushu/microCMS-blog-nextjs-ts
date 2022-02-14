import { ComponentStory, ComponentMeta } from '@storybook/react'
import PostCard from 'components/molecules/post/PostCard'
import { blog } from 'types/cms-types'

export default {
  title: 'Molecules/Post/PostCard',
  component: PostCard,
  argTypes: {
    h: {
      defaultValue: 1,
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'PostCard',
    },
  },
} as ComponentMeta<typeof PostCard>

const blogData = {
  id: '6qsfuycz96',

  category: ['others'],
  createdAt: '2022-01-25T03:27:59.162Z',
  metaDescription: 'テキスト系のレンダリング確認',
  metaRobots: false,
  slug: 'html-test',
  title: 'テキスト系のレンダリング確認',
  content: '',
  thumbnail: '☕',

  publishedAt: '2022-01-25T03:27:59.162Z',
  revisedAt: '2022-01-28T04:59:12.937Z',
  updatedAt: '2022-01-28T04:59:12.937Z',
} as blog

export const Default: ComponentStory<typeof PostCard> = () => (
  <div className="grid gap-8 md:grid-cols-3 md:gap-4">
    <PostCard blog={blogData} />
    <PostCard blog={blogData} />
    <PostCard blog={blogData} />
    <PostCard blog={blogData} />
    <PostCard blog={blogData} />
    <PostCard blog={blogData} />
  </div>
)
