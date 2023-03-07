import { render } from '@testing-library/react';

import Alert from '@kanagawa-rifle/website/components/Alert';

describe('Sample', () => {
  it('do sample test', () => {
    const { getByText } = render(<Alert>test</Alert>);

    expect(getByText('test')).toBeTruthy();
  });
});
