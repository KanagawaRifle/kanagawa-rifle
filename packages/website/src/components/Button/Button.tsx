import * as React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps, ButtonTypeMap } from '@mui/material/Button';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type ButtonProps<D extends React.ElementType = 'button', P = {}> = MuiButtonProps<D, P>;

const Button: OverridableComponent<ButtonTypeMap<{}, 'button'>> = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return <MuiButton {...props} ref={ref} />;
  }
);

export default Button;
