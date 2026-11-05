import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { Card, CardActionArea, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文がここに入ります。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>カードの本文コンテンツです。</p>
      </CardContent>
      <CardFooter>
        <Button>アクション</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-4">
      <p>シンプルなカードコンテンツ</p>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>お知らせ</CardTitle>
      </CardHeader>
      <CardContent>
        <p>重要なお知らせの内容がここに表示されます。</p>
      </CardContent>
    </Card>
  ),
};

export const WithActionArea: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardActionArea href="#">
        <CardHeader>
          <CardTitle>クリック可能なカード</CardTitle>
          <CardDescription>カード全体がリンクになっています。</CardDescription>
        </CardHeader>
        <CardContent>
          <p>ホバーすると背景色が変わります。</p>
        </CardContent>
      </CardActionArea>
    </Card>
  ),
};

export const HeadingLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle as="h2">H2 タイトル</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle as="h3">H3 タイトル</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle as="h4">H4 タイトル</CardTitle>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>カード 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p>1つ目のカード</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>カード 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p>2つ目のカード</p>
        </CardContent>
      </Card>
    </div>
  ),
};
