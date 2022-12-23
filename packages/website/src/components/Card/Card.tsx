import * as React from 'react';
import clsx from 'clsx';
import MuiCard from '@mui/material/Card';

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
