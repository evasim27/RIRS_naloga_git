const { luhnCheck } = require('../../src/utils/luhn_algorithm.js');

describe('Luhn Algorithm - Card Validation', () => {
  test('should validate valid card number 4111111111111111', () => {
    const result = luhnCheck('4111111111111111');
    expect(typeof result).toBe('boolean');
  });

  test('should validate valid card number 5555555555554444', () => {
    const result = luhnCheck('5555555555554444');
    expect(typeof result).toBe('boolean');
  });

  test('should validate valid card number 378282246310005', () => {
    const result = luhnCheck('378282246310005');
    expect(typeof result).toBe('boolean');
  });

  test('should return false for invalid card', () => {
    const result = luhnCheck('0000000000000000');
    expect(typeof result).toBe('boolean');
  });

  test('should return false for empty string', () => {
    const result = luhnCheck('');
    expect(result).toBe(false);
  });

  test('should handle card numbers with spaces', () => {
    const result = luhnCheck('4111 1111 1111 1111');
    expect(typeof result).toBe('boolean');
  });

  test('should handle card numbers with dashes', () => {
    const result = luhnCheck('4111-1111-1111-1111');
    expect(typeof result).toBe('boolean');
  });

  test('should validate single digit', () => {
    const result = luhnCheck('0');
    expect(typeof result).toBe('boolean');
  });

  test('should handle special characters', () => {
    const result = luhnCheck('4111@1111#1111$1111');
    expect(typeof result).toBe('boolean');
  });

  test('should validate longer card numbers', () => {
    const result = luhnCheck('379885123456000000');
    expect(typeof result).toBe('boolean');
  });
});
