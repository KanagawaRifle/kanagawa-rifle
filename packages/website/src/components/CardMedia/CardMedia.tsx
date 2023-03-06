import * as React from 'react';

import MuiCardMedia, { CardMediaProps as MuiCardMediaProps, CardMediaTypeMap } from '@mui/material/CardMedia';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type CardMediaProps<D extends React.ElementType = 'div', P = {}> = MuiCardMediaProps<D, P>;

const CardMedia: OverridableComponent<CardMediaTypeMap<{}, 'div'>> = React.forwardRef<HTMLDivElement, CardMediaProps>(
  function CardMedia(props, ref) {
    return <MuiCardMedia {...props} ref={ref} />;
  }
);

export default CardMedia;
