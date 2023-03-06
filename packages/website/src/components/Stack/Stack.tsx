import * as React from 'react';

import MuiStack, { StackProps as MuiStackProps } from '@mui/material/Stack';

export type StackProps = MuiStackProps;

const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Card(props, ref) {
  const { children, ...others } = { ...props };

  return (
    <MuiStack {...others} ref={ref}>
      {children}
    </MuiStack>
  );
});

export default Stack;
