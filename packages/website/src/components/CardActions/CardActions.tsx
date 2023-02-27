import * as React from 'react';
import MuiCardActions, { CardActionsProps as MuiCardActionsProps } from '@mui/material/CardActions';

export type CardActionsProps = MuiCardActionsProps;

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(function CardActions(props, ref) {
  return <MuiCardActions {...props} ref={ref} />;
});

export default CardActions;
