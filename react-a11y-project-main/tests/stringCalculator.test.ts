import { add } from '../src/stringCalculator';

describe('String Calculator', () => {
  // Test 1: Empty string returns 0
  test('returns 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  // Test 2: Single number returns that number
  test('returns the number itself for single number', () => {
    expect(add('1')).toBe(1);
    expect(add('5')).toBe(5);
  });

  // Test 3: Two comma-separated numbers return their sum
  test('returns sum of two comma-separated numbers', () => {
    expect(add('1,2')).toBe(3);
    expect(add('10,20')).toBe(30);
  });

  // Test 4: Handle multiple numbers
  test('returns sum of multiple comma-separated numbers', () => {
    expect(add('1,2,3')).toBe(6);
    expect(add('1,2,3,4,5')).toBe(15);
  });

  // Test 5: Handle newlines as delimiters
  test('handles newlines between numbers', () => {
    expect(add('1\n2,3')).toBe(6);
    expect(add('1\n2\n3')).toBe(6);
  });

  // Test 6: Handle whitespace
  test('ignores whitespace around numbers', () => {
    expect(add('1, 2, 3')).toBe(6);
    expect(add(' 1 , 2 , 3 ')).toBe(6);
  });

  // Test 7: Negative numbers throw error
  test('throws error for negative numbers', () => {
    expect(() => add('1,-2,3')).toThrow('Negative numbers not allowed: -2');
    expect(() => add('1,-2,-3')).toThrow('Negative numbers not allowed: -2, -3');
  });

  // Test 8: Custom delimiter
  test('supports custom delimiter', () => {
    expect(add('//;\n1;2')).toBe(3);
    expect(add('//|\n1|2|3')).toBe(6);
  });

  // Test 9: Ignore numbers greater than 1000
  test('ignores numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
    expect(add('1000,1001,2')).toBe(1002);
  });
});
