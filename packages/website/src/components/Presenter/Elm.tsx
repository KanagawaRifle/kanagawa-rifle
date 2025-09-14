
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import * as React from 'react';

import Footer from '@kanagawa-rifle/website/components/Footer';
import Header from '@kanagawa-rifle/website/components/Header';

export type MainBodyProps = {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const Elm: React.FC<MainBodyProps> = (props) => {
  const { children, maxWidth = 'sm' } = { ...props };

  return (
    <>
      <Header />
      <Container maxWidth={maxWidth} className={'p-4'}>
        <Stack spacing={2}>{children}</Stack>
      </Container>
      <Footer />
    </>
  );
};

export default Elm;
