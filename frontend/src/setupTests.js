// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock environment variables
process.env.REACT_APP_USER_SERVICE_URL = 'http://localhost:8001';
process.env.REACT_APP_MERCHANT_SERVICE_URL = 'http://localhost:8002';
process.env.REACT_APP_ORDER_SERVICE_URL = 'http://localhost:8003';
process.env.REACT_APP_OFFER_SERVICE_URL = 'http://localhost:8004';
process.env.REACT_APP_PAYMENT_SERVICE_URL = 'http://localhost:8005';
process.env.REACT_APP_NOTIFICATION_SERVICE_URL = 'http://localhost:8006';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
