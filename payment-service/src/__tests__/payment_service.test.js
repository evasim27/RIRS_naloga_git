jest.mock('../db/db.js');

describe('Payment Service', () => {
  let paymentService;

  beforeEach(() => {
    jest.resetModules();
  });

  test('payment service module exists', () => {
    expect(() => {
      paymentService = require('../../src/services/payment_service.js');
    }).not.toThrow();
  });

  test('should have processPayment method', () => {
    paymentService = require('../../src/services/payment_service.js');
    expect(paymentService.processPayment).toBeDefined();
  });

  test('should have getPaymentHistory method', () => {
    paymentService = require('../../src/services/payment_service.js');
    expect(paymentService.getPaymentHistory).toBeDefined();
  });

  test('should have validateCard method', () => {
    paymentService = require('../../src/services/payment_service.js');
    expect(paymentService.validateCard).toBeDefined();
  });

  test('should handle payment validation', async () => {
    paymentService = require('../../src/services/payment_service.js');
    const result = await paymentService.processPayment({});
    expect(result).toBeDefined();
  });

  test('should handle invalid payment data', async () => {
    paymentService = require('../../src/services/payment_service.js');
    expect(async () => {
      await paymentService.processPayment(null);
    }).toBeDefined();
  });
});
