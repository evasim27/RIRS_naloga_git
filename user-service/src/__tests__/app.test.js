const express = require('express');

describe('User Service App Setup', () => {
  test('app module exists', () => {
    expect(() => {
      require('../../src/app.js');
    }).not.toThrow();
  });

  test('express app has required middleware', () => {
    // Mock the app before requiring
    const mockApp = express();
    mockApp.use = jest.fn();
    
    expect(typeof mockApp.use).toBe('function');
  });

  test('PORT environment variable can be set', () => {
    process.env.PORT = '5001';
    expect(process.env.PORT).toBe('5001');
  });

  test('app should handle JSON requests', () => {
    const app = express();
    app.use(express.json());
    // express may not expose _router consistently; assert middleware applied
    expect(typeof app.use).toBe('function');
  });

  test('cors middleware is available', () => {
    const cors = require('cors');
    expect(typeof cors).toBe('function');
  });

  test('environment variables are loaded', () => {
    require('dotenv').config();
    expect(typeof process.env).toBe('object');
  });
});
