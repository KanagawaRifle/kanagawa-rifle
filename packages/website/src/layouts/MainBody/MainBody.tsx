import * as React from 'react';
import Header from '@kanagawa-rifle/website/layouts/Header';
import Footer from '@kanagawa-rifle/website/layouts/Footer';
import Container from '@kanagawa-rifle/website/components/Container';
import Stack from '@kanagawa-rifle/website/components/Stack';

export type MainBodyProps = {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const MainBody: React.FC<MainBodyProps> = (props) => {
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

export default MainBody;
