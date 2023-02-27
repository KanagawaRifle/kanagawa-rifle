import * as React from 'react';
import clsx from 'clsx';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import styles from './Alert.module.scss';

export type AlertProps = MuiAlertProps;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Card(props, ref) {
  const { className, ...others } = { ...props };

  return <MuiAlert className={clsx(className, styles.module)} {...others} ref={ref} />;
});

export default Alert;
