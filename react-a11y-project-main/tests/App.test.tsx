import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../src/App';

expect.extend(toHaveNoViolations);

describe('String Calculator Accessibility', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('image has alt text', () => {
    render(<App />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt');
    expect(image.getAttribute('alt')).not.toBe('');
  });

  test('textarea has associated label', () => {
    render(<App />);
    const textarea = screen.getByLabelText(/input your numbers/i);
    expect(textarea).toBeInTheDocument();
  });

  test('calculate button is keyboard accessible', async () => {
    render(<App />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /calculate/i });
    
    await user.tab();
    expect(button).toHaveFocus();
  });

  test('calculates sum correctly', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/input your numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });
    
    await user.type(textarea, '1,2,3');
    await user.click(button);
    
    expect(screen.getByText(/result: 6/i)).toBeInTheDocument();
  });

  test('result is announced to screen readers', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/input your numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });
    
    await user.type(textarea, '5,10');
    await user.click(button);
    
    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toHaveAttribute('aria-live', 'polite');
    expect(statusRegion).toHaveTextContent('Result: 15');
  });

  test('heading hierarchy is correct', () => {
    const { container } = render(<App />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings[0].tagName).toBe('H1');
    expect(headings[1].tagName).toBe('H2');
  });
});
