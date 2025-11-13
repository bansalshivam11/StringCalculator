import { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // Your calculation logic here
    // For example: setResult(input.split(',').reduce((sum, num) => sum + Number(num), 0));
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
        onChange={(e) => setInput(e.target.value)}
        aria-describedby='input-instructions'
      />

      <p id='input-instructions' style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
        Make sure you enter numbers correctly, separated by commas!
      </p>

      <button
        onClick={handleCalculate}
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
        onFocus={(e) => e.target.style.outline = '3px solid #ffa500'}
        onBlur={(e) => e.target.style.outline = 'none'}
        aria-label='Calculate the sum of entered numbers'
      >
        Calculate
      </button>

      {result !== null && (
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
