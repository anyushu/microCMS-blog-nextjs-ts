import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './Button'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'Button',
    },
    href: {
      control: { type: 'text' },
      defaultValue: 'https://google.com',
    },
  },
} as ComponentMeta<typeof Button>

export const Default: ComponentStory<typeof Button> = (args) => <Button>{args.children}</Button>

export const Link: ComponentStory<typeof Button> = (args) => (
  <Button href={args.href}>{args.children}</Button>
)
