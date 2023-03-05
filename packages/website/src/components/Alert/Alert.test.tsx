import Alert from '@kanagawa-rifle/website/components/Alert';
import { render } from '@testing-library/react';

describe('Sample', () => {
  it('do sample test', () => {
    const { getByText } = render(<Alert>test</Alert>);

    expect(getByText('test')).toBeTruthy();
  });
});
