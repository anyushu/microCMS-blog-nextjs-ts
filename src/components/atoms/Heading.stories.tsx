import { ComponentStory, ComponentMeta } from '@storybook/react'
import Heading from './Heading'

export default {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {
    h: {
      defaultValue: 1,
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Heading',
    },
  },
} as ComponentMeta<typeof Heading>

export const Default: ComponentStory<typeof Heading> = (args) => (
  <Heading h={args.h}>{args.children}</Heading>
)
