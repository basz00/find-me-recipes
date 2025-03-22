import { capitalize } from '../stringhelper';

describe('capitalize', () => {
  it('should capitalize the first letter of a lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should not change an already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  it('should capitalize single character strings', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should handle strings with special characters', () => {
    expect(capitalize('@hello')).toBe('@hello');
  });

  it('should handle strings with numbers', () => {
    expect(capitalize('1hello')).toBe('1hello');
  });
});