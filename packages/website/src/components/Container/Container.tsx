import * as React from 'react';
import MuiContainer from '@mui/material/Container';

export type ContainerProps = {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & React.ComponentProps<'div'>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Card(props, ref) {
  return <MuiContainer {...props} ref={ref} />;
});

export default Container;
