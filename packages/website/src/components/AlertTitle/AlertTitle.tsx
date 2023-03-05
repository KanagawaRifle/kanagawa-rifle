import * as React from 'react';

import MuiAlertTitle, { AlertTitleProps as MuiAlertTitleProps } from '@mui/material/AlertTitle';

export type AlertTitleProps = MuiAlertTitleProps;

const AlertTitle = React.forwardRef<HTMLDivElement, AlertTitleProps>(function Card(props, ref) {
  return <MuiAlertTitle {...props} ref={ref} />;
});

export default AlertTitle;
