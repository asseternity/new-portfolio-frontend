import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

// helper functions
function sum(x: number, y: number): number {
  return x + y;
}

// mocks
vi.mock('@/components/ui/button', () => ({
  Button: (props: any) => <button {...props} />,
  buttonVariants: vi.fn(),
}));
vi.mock('@/components/ui/carousel', () => ({
  Carousel: (props: any) => <div {...props} />,
  CarouselContent: (props: any) => <div {...props} />,
  CarouselItem: (props: any) => <div {...props} />,
}));

// tests of testing
describe('Testing compilation', () => {
  it('compile test', () => {
    expect(1).toBe(1);
  });
  it('adds two numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});

// app tests
describe('App tests', () => {
  it('renders app heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Gallery' })
    ).toBeInTheDocument();
  });
});
