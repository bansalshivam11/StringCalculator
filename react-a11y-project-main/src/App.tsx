import { useState, ChangeEvent, FocusEvent } from 'react';
import { add } from './stringCalculator';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = (): void => {
    try {
      setError('');
      const sum = add(input);
      setResult(sum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCalculate();
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Hero Section with Calculator Icon */}
      <header style={styles.header}>
        <div style={styles.iconContainer}>
          {/* Calculator SVG Icon */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={styles.icon}
          >
            <rect x="4" y="2" width="16" height="20" rx="2" stroke="#0066cc" strokeWidth="2" fill="#e3f2fd"/>
            <rect x="6" y="5" width="12" height="3" rx="1" fill="#0066cc"/>
            <circle cx="8" cy="12" r="1.5" fill="#0066cc"/>
            <circle cx="12" cy="12" r="1.5" fill="#0066cc"/>
            <circle cx="16" cy="12" r="1.5" fill="#0066cc"/>
            <circle cx="8" cy="16" r="1.5" fill="#0066cc"/>
            <circle cx="12" cy="16" r="1.5" fill="#0066cc"/>
            <circle cx="16" cy="16" r="1.5" fill="#0066cc"/>
            <circle cx="8" cy="20" r="1.5" fill="#0066cc"/>
            <circle cx="12" cy="20" r="1.5" fill="#0066cc"/>
            <rect x="14.5" y="18.5" width="3" height="3" rx="1" fill="#ff6b6b"/>
          </svg>
        </div>
        <h1 style={styles.title}>String Calculator</h1>
        <p style={styles.subtitle}>
          A powerful calculator supporting multiple delimiters and custom formats
        </p>
      </header>

      {/* Main Calculator Card */}
      <main style={styles.mainCard}>
        <div style={styles.cardContent}>
          {/* Input Section */}
          <section style={styles.inputSection}>
            <label htmlFor='number-input' style={styles.label}>
              Enter Numbers
            </label>
            <textarea
              id='number-input'
              style={{
                ...styles.textarea,
                ...(error ? styles.textareaError : {})
              }}
              placeholder='e.g., 1,2,3 or 1\n2\n3 or //;\n1;2;3'
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              aria-describedby='input-instructions'
              aria-invalid={!!error}
            />
            <p id='input-instructions' style={styles.instructions}>
              <span style={styles.instructionIcon}>💡</span>
              Supports comma (1,2,3), newline, or custom delimiter (//;\n1;2;3). 
              <strong> Press Ctrl+Enter to calculate</strong>
            </p>
          </section>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            style={styles.calculateButton}
            aria-label='Calculate the sum of entered numbers'
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.3)';
            }}
            onFocus={(e: FocusEvent<HTMLButtonElement>) => {
              e.target.style.outline = '3px solid #ffa500';
              e.target.style.outlineOffset = '2px';
            }}
            onBlur={(e: FocusEvent<HTMLButtonElement>) => {
              e.target.style.outline = 'none';
            }}
          >
            <span style={styles.buttonIcon}>🧮</span>
            Calculate Sum
          </button>

          {/* Error Display */}
          {error && (
            <div role='alert' style={styles.errorCard} aria-live='assertive'>
              <div style={styles.errorIcon}>⚠️</div>
              <div style={styles.errorContent}>
                <h3 style={styles.errorTitle}>Invalid Input</h3>
                <p style={styles.errorMessage}>{error}</p>
              </div>
            </div>
          )}

          {/* Result Display */}
          {result !== null && !error && (
            <div role='status' aria-live='polite' style={styles.resultCard}>
              <div style={styles.resultIcon}>✓</div>
              <div style={styles.resultContent}>
                <h3 style={styles.resultLabel}>Sum Result</h3>
                <p style={styles.resultValue}>{result.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <aside style={styles.featuresSection}>
          <h2 style={styles.featuresTitle}>Features</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <span style={styles.featureEmoji}>🔢</span>
              <h3 style={styles.featureTitle}>Multiple Delimiters</h3>
              <p style={styles.featureText}>Comma, newline, or custom</p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureEmoji}>🚫</span>
              <h3 style={styles.featureTitle}>Negative Check</h3>
              <p style={styles.featureText}>Validates negative numbers</p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureEmoji}>♿</span>
              <h3 style={styles.featureTitle}>Fully Accessible</h3>
              <p style={styles.featureText}>Screen reader & keyboard ready</p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built with React & TypeScript • Accessibility First • TDD Approach
        </p>
      </footer>
    </div>
  );
};

// Styles Object
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#fff',
  },
  iconContainer: {
    display: 'inline-block',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  },
  icon: {
    display: 'block',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    margin: '0 0 12px 0',
    color: '#fff',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  subtitle: {
    fontSize: '1.125rem',
    fontWeight: '400',
    margin: 0,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  mainCard: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  cardContent: {
    padding: '40px',
  },
  inputSection: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '12px',
  },
  textarea: {
    width: '100%',
    minHeight: '140px',
    padding: '16px',
    fontSize: '1rem',
    color: '#2d3748',
    backgroundColor: '#f7fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    resize: 'vertical',
    fontFamily: 'Monaco, Consolas, monospace',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  },
  textareaError: {
    borderColor: '#fc8181',
    backgroundColor: '#fff5f5',
  },
  instructions: {
    marginTop: '12px',
    fontSize: '0.875rem',
    color: '#718096',
    lineHeight: '1.6',
  },
  instructionIcon: {
    marginRight: '6px',
  },
  calculateButton: {
    width: '100%',
    padding: '18px 32px',
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  buttonIcon: {
    fontSize: '1.5rem',
  },
  errorCard: {
    marginTop: '24px',
    padding: '20px',
    backgroundColor: '#fff5f5',
    border: '2px solid #fc8181',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  errorIcon: {
    fontSize: '1.75rem',
    flexShrink: 0,
  },
  errorContent: {
    flex: 1,
  },
  errorTitle: {
    margin: '0 0 6px 0',
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#c53030',
  },
  errorMessage: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#742a2a',
    lineHeight: '1.5',
  },
  resultCard: {
    marginTop: '24px',
    padding: '24px',
    backgroundColor: '#f0fdf4',
    border: '2px solid #86efac',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  resultIcon: {
    fontSize: '2.5rem',
    backgroundColor: '#22c55e',
    color: '#fff',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontWeight: 'bold',
  },
  resultContent: {
    flex: 1,
  },
  resultLabel: {
    margin: '0 0 8px 0',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#166534',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  resultValue: {
    margin: 0,
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#15803d',
  },
  featuresSection: {
    padding: '32px 40px 40px',
    backgroundColor: '#f7fafc',
    borderTop: '1px solid #e2e8f0',
  },
  featuresTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '20px',
    textAlign: 'center',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  featureCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  featureEmoji: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: '12px',
  },
  featureTitle: {
    margin: '0 0 8px 0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2d3748',
  },
  featureText: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#718096',
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0,
  },
};

export default App;
