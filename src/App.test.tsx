import { screen, render } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

vi.mock('Gallery6', () => ({
  default: () => {
    return <div>{'Mock'}</div>;
  },
}));

describe('App tests', () => {
  it('compile test', () => {
    expect(1).toBe(1);
  });
  it('should render the title', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Gallery');
  });
});
