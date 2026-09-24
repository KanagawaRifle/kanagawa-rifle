import type { Meta, StoryObj } from '@storybook/nextjs';

import { Alert, AlertDescription, AlertTitle } from './alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>お知らせ</AlertTitle>
      <AlertDescription>これはデフォルトのアラートメッセージです。</AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info" className="w-[400px]">
      <AlertTitle>情報</AlertTitle>
      <AlertDescription>重要な情報をお知らせします。</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-[400px]">
      <AlertTitle>成功</AlertTitle>
      <AlertDescription>操作が正常に完了しました。</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-[400px]">
      <AlertTitle>警告</AlertTitle>
      <AlertDescription>この操作には注意が必要です。</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertTitle>エラー</AlertTitle>
      <AlertDescription>操作中にエラーが発生しました。</AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert variant="info" className="w-[400px]">
      <AlertTitle>タイトルのみのアラート</AlertTitle>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="info" className="w-[400px]">
      <AlertTitle>第25回冬季ＡＲ･ＡＰランクリスト競技会</AlertTitle>
      <AlertDescription>
        2025年1月15日（水）に開催予定です。詳細は後日お知らせいたします。参加をご希望の方は、事前にお申し込みください。
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>デフォルトスタイルのアラート</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>情報を伝えるアラート</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>成功を伝えるアラート</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>警告を伝えるアラート</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>エラーを伝えるアラート</AlertDescription>
      </Alert>
    </div>
  ),
};
