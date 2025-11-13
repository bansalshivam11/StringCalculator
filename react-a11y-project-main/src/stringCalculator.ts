/**
 * String Calculator - Adds numbers from a string input
 * @param numbers - String containing numbers separated by delimiters
 * @returns Sum of all numbers
 */
export function add(numbers: string): number {
  // Empty string returns 0
  if (!numbers || numbers.trim() === '') {
    return 0;
  }

  // Check for custom delimiter
  let delimiter = /[,\n]/; // Default delimiters: comma or newline
  let numberString = numbers;

  if (numbers.startsWith('//')) {
    const delimiterEndIndex = numbers.indexOf('\n');
    const customDelimiter = numbers.substring(2, delimiterEndIndex);
    delimiter = new RegExp(escapeRegExp(customDelimiter));
    numberString = numbers.substring(delimiterEndIndex + 1);
  }

  // Split by delimiter and parse numbers
  const numArray = numberString
    .split(delimiter)
    .map(n => n.trim())
    .filter(n => n !== '')
    .map(n => parseInt(n, 10));

  // Check for negative numbers
  const negatives = numArray.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
  }

  // Sum numbers, ignoring those > 1000
  return numArray
    .filter(n => n <= 1000)
    .reduce((sum, num) => sum + num, 0);
}

/**
 * Helper function to escape special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
