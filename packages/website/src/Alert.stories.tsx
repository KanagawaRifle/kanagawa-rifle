import Alert from '@kanagawa-rifle/website/components/Alert';
import { ComponentMeta } from '@storybook/react';

export default {
  title: 'Example/Alert',
  component: Alert,
  argTypes: {
    severity: { control: 'select', options: ['info', 'warning', 'error', 'success'] },
  },
} as ComponentMeta<typeof Alert>;
