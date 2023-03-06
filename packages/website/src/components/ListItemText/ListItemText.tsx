import * as React from 'react';

import MuiListItemText, { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';

export type ListItemTextProps<
  P extends React.ElementType = 'span',
  S extends React.ElementType = 'p'
> = MuiListItemTextProps<P, S>;

const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(function ListItemText(props, ref) {
  return <MuiListItemText {...props} ref={ref} />;
});

export default ListItemText;
