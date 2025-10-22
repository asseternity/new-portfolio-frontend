import { screen, render } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

function sum(x: number, y: number): number {
  return x + y;
}

vi.mock('Gallery6', () => ({
  default: () => {
    return <div>{'Mock'}</div>;
  },
}));

describe('Testing compilation', () => {
  it('compile test', () => {
    expect(1).toBe(1);
  });
  it('adds two numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});

describe('App tests', () => {
  it('renders the heading', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
