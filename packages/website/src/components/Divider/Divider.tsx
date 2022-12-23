import * as React from 'react';
import clsx from 'clsx';

import MuiDivider, { DividerProps as MuiDividerProps, DividerTypeMap } from '@mui/material/Divider';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type DividerProps<D extends React.ElementType = 'hr', P = {}> = MuiDividerProps<D, P>;

const Divider: OverridableComponent<DividerTypeMap<{}, 'hr'>> = React.forwardRef<HTMLHRElement, DividerProps>(
  function Divider(props, ref) {
    const { className, ...others } = { ...props };

    return <MuiDivider className={clsx('', className)} {...props} ref={ref} />;
  }
);

export default Divider;
