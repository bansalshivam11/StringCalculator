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

  test('SVG icon is properly hidden from screen readers', () => {
    render(<App />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  test('textarea has associated label', () => {
    render(<App />);
    const textarea = screen.getByLabelText(/enter numbers/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'number-input');
  });

  test('textarea has aria-describedby for instructions', () => {
    render(<App />);
    const textarea = screen.getByLabelText(/enter numbers/i);
    expect(textarea).toHaveAttribute('aria-describedby', 'input-instructions');
    
    const instructions = screen.getByText(/supports comma/i);
    expect(instructions).toHaveAttribute('id', 'input-instructions');
  });

  test('tab order flows correctly through interactive elements', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });
    
    // First tab focuses textarea
    await user.tab();
    expect(textarea).toHaveFocus();
    
    // Second tab focuses button
    await user.tab();
    expect(button).toHaveFocus();
  });

  test('button is focusable and has proper aria-label', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /calculate the sum of entered numbers/i });
    expect(button).toBeInTheDocument();
    
    button.focus();
    expect(button).toHaveFocus();
  });

  test('calculates sum correctly', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    await user.type(textarea, '1,2,3');
    await user.click(button);

    // The new design shows "Sum Result" as heading and result value separately
    expect(screen.getByText(/sum result/i)).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  test('result is announced to screen readers', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    await user.type(textarea, '5,10');
    await user.click(button);

    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toHaveAttribute('aria-live', 'polite');
    expect(statusRegion).toHaveTextContent('15');
  });

  test('displays error for negative numbers', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    await user.type(textarea, '1,-2,3');
    await user.click(button);

    const alertRegion = screen.getByRole('alert');
    expect(alertRegion).toHaveAttribute('aria-live', 'assertive');
    expect(alertRegion).toHaveTextContent(/negative numbers not allowed/i);
  });

  test('error message has proper aria-invalid on textarea', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    // Initially not invalid
    expect(textarea).toHaveAttribute('aria-invalid', 'false');

    await user.type(textarea, '1,-2');
    await user.click(button);

    // After error, should be invalid
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  test('heading hierarchy is correct', () => {
    const { container } = render(<App />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // h1: "String Calculator"
    expect(headings[0].tagName).toBe('H1');
    expect(headings[0]).toHaveTextContent('String Calculator');
    
    // h2: "Features"
    expect(headings[1].tagName).toBe('H2');
    expect(headings[1]).toHaveTextContent('Features');
  });

  test('keyboard shortcut Ctrl+Enter triggers calculation', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/enter numbers/i);

    await user.click(textarea);
    await user.type(textarea, '4,5,6');
    await user.keyboard('{Control>}{Enter}{/Control}');

    expect(screen.getByText('15')).toBeInTheDocument();
  });

  test('clears error when user starts typing', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    // Create error
    await user.type(textarea, '1,-2');
    await user.click(button);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Clear and type new value
    await user.clear(textarea);
    await user.type(textarea, '1');

    // Error should be gone
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('supports custom delimiter calculation', async () => {
    render(<App />);
    const user = userEvent.setup();
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    await user.type(textarea, '//;\n1;2;3');
    await user.click(button);

    expect(screen.getByText('6')).toBeInTheDocument();
  });

  test('feature cards are present and accessible', () => {
    render(<App />);
    
  const featuresHeading = screen.getByRole('heading', { name: /features/i, level: 2 });
  expect(featuresHeading).toBeInTheDocument();
  });

  test('footer contains proper attribution', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(/Built with React & TypeScript/i);
    expect(footer).toHaveTextContent(/TDD Approach/i);
  });
});
