import * as React from 'react';

import MuiCard from '@mui/material/Card';
import clsx from 'clsx';

export type CardProps = {} & React.ComponentProps<'div'>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const { className, ...others } = { ...props };

  return (
    <MuiCard
      variant="outlined"
      className={clsx(className, 'bg-transparent text-white border-gray-400')}
      {...others}
      ref={ref}
    />
  );
});

export default Card;
