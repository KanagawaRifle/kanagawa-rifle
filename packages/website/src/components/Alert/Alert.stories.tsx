import React from 'react';

import Alert from '@kanagawa-rifle/website/components/Alert';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Example/Alert',
  component: Alert,
  argTypes: {
    severity: { control: 'select', options: ['info', 'warning', 'error', 'success'] },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
  children: 'This is an alert — check it out!',
  severity: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
  children: 'This is an alert — check it out!',
  severity: 'warning',
};

export const Error = Template.bind({});
Error.args = {
  children: 'This is an alert — check it out!',
  severity: 'error',
};

export const Success = Template.bind({});
Success.args = {
  children: 'This is an alert — check it out!',
  severity: 'success',
};
