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
    setError(''); // Clear error on input change
  };

  const handleFocus = (e: FocusEvent<HTMLButtonElement>): void => {
    e.target.style.outline = '3px solid #ffa500';
  };

  const handleBlur = (e: FocusEvent<HTMLButtonElement>): void => {
    e.target.style.outline = 'none';
  };

  return (
    <main style={{ padding: '20px', backgroundColor: '#fff', color: '#333' }}>
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='Calculator application interface showing mathematical calculations'
        width={600}
        height={400}
      />

      <h1>String Calculator</h1>

      <h2 style={{ fontSize: '1.25rem' }}>Enter numbers</h2>

      <label htmlFor='number-input' style={{ display: 'block', marginBottom: '8px', color: '#333' }}>
        Input your numbers (comma-separated):
      </label>
      <textarea
        id='number-input'
        style={{ 
          margin: '10px 0', 
          color: '#333',
          border: '2px solid #333',
          padding: '8px',
          width: '100%',
          minHeight: '100px'
        }}
        placeholder='Enter numbers separated by commas (e.g., 1,2,3)'
        value={input}
        onChange={handleInputChange}
        aria-describedby='input-instructions'
      />

      <p id='input-instructions' style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
        Supports: comma (1,2,3), newline (1\n2\n3), or custom delimiter (//;\n1;2)
      </p>

      <button
        onClick={handleCalculate}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          padding: '12px 24px',
          backgroundColor: '#0066cc',
          color: '#fff',
          border: '2px solid #0052a3',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '4px',
          marginTop: '10px'
        }}
        aria-label='Calculate the sum of entered numbers'
      >
        Calculate
      </button>

      {error && (
        <div 
          role='alert'
          style={{ 
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px'
          }}
        >
          <p style={{ color: '#721c24', fontWeight: 'bold', margin: 0 }}>
            Error: {error}
          </p>
        </div>
      )}

      {result !== null && !error && (
        <div 
          role='status' 
          aria-live='polite'
          style={{ 
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px'
          }}
        >
          <p style={{ color: '#155724', fontWeight: 'bold', margin: 0 }}>
            Result: {result}
          </p>
        </div>
      )}
    </main>
  );
};

export default App;
