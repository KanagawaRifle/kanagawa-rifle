
import Box from '@mui/material/Box';
import * as React from 'react';

import {Header, Footer} from '@/components';

export type MainBodyProps = {
  children: React.ReactNode;
};

const Elm: React.FC<MainBodyProps> = (props) => {
  const { children } = { ...props };

  return (
    <>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

export default Elm;
