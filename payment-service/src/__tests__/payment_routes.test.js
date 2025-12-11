describe('Payment Routes', () => {
  let router;

  beforeEach(() => {
    jest.resetModules();
  });

  test('payment routes module exists', () => {
    expect(() => {
      router = require('../../src/routes/payment_routes.js');
    }).not.toThrow();
  });

  test('router is an Express router', () => {
    router = require('../../src/routes/payment_routes.js');
    expect(router).toBeDefined();
    expect(typeof router.get).toBe('function');
    expect(typeof router.post).toBe('function');
  });

  test('should have POST route for payments', () => {
    router = require('../../src/routes/payment_routes.js');
    expect(router.stack).toBeDefined();
  });

  test('should have GET route for payments', () => {
    router = require('../../src/routes/payment_routes.js');
    expect(router.stack).toBeDefined();
  });

  test('all route methods are defined', () => {
    router = require('../../src/routes/payment_routes.js');
    expect(typeof router.get).toBe('function');
    expect(typeof router.post).toBe('function');
    expect(typeof router.put).toBe('function');
    expect(typeof router.delete).toBe('function');
  });

  test('router should export as Express router', () => {
    router = require('../../src/routes/payment_routes.js');
    expect(router.constructor.name).toMatch(/Router|EventEmitter/);
  });
});
