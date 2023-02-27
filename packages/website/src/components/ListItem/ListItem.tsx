import * as React from 'react';
import MuiListItem, { ListItemProps as MuiListItemProps, ListItemTypeMap } from '@mui/material/ListItem';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type ListItemProps<D extends React.ElementType = 'li', P = {}> = MuiListItemProps<D, P>;

const ListItem: OverridableComponent<ListItemTypeMap<{}, 'li'>> = React.forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    return <MuiListItem {...props} ref={ref} />;
  }
);

export default ListItem;
