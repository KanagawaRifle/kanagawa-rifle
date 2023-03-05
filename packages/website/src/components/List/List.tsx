import * as React from 'react';

import MuiList, { ListProps as MuiListProps, ListTypeMap } from '@mui/material/List';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type ListProps<D extends React.ElementType = 'ul', P = {}> = MuiListProps<D, P>;

const List: OverridableComponent<ListTypeMap<{}, 'ul'>> = React.forwardRef<HTMLUListElement, ListProps>(function List(
  props,
  ref
) {
  return <MuiList {...props} ref={ref} />;
});

export default List;
