import * as React from 'react';
import MuiCardActionArea, { CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';

export type CardActionAreaProps = MuiCardActionAreaProps;

const CardActionArea = React.forwardRef<HTMLButtonElement, CardActionAreaProps>(function CardActionArea(props, ref) {
  return <MuiCardActionArea {...props} ref={ref} />;
});

export default CardActionArea;
