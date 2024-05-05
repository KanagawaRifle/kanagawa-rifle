import * as React from 'react';

import MuiCardHeader, { CardHeaderProps as MuiCardHeaderProps } from '@mui/material/CardHeader';

export type CardHeaderProps = MuiCardHeaderProps;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function Card(props, ref) {
  return <MuiCardHeader {...props} ref={ref} subheaderTypographyProps={{}} />;
});

export default CardHeader;
