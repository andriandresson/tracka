import { render } from '@testing-library/react';

import TrackaContext from './tracka-context';

describe('TrackaContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrackaContext />);
    expect(baseElement).toBeTruthy();
  });
});
