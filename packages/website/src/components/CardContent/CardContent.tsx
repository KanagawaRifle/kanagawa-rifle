import * as React from 'react';

import MuiCardContent from '@mui/material/CardContent';

export type CardContentProps = {} & React.ComponentProps<'div'>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(function Card(props, ref) {
  return <MuiCardContent {...props} ref={ref} />;
});

export default CardContent;
