describe('User Routes', () => {
  let router;

  beforeEach(() => {
    jest.resetModules();
  });

  test('routes module exists', () => {
    expect(() => {
      router = require('../../src/routes/user_routes.js');
    }).not.toThrow();
  });

  test('router is an Express router', () => {
    router = require('../../src/routes/user_routes.js');
    expect(router).toBeDefined();
    expect(typeof router.get).toBe('function');
    expect(typeof router.post).toBe('function');
    expect(typeof router.put).toBe('function');
    expect(typeof router.delete).toBe('function');
  });

  test('POST /register route exists', () => {
    router = require('../../src/routes/user_routes.js');
    expect(router.stack.some(layer => layer.route && layer.route.path === '/register')).toBe(true);
  });

  test('POST /login route exists', () => {
    router = require('../../src/routes/user_routes.js');
    expect(router.stack.some(layer => layer.route && layer.route.path === '/login')).toBe(true);
  });

  test('GET / route exists', () => {
    router = require('../../src/routes/user_routes.js');
    expect(router.stack.some(layer => layer.route && layer.route.path === '/')).toBe(true);
  });

  test('GET /:id route exists', () => {
    router = require('../../src/routes/user_routes.js');
    expect(router.stack.some(layer => layer.route && layer.route.path === '/:id')).toBe(true);
  });

  test('PUT /:id route exists', () => {
    router = require('../../src/routes/user_routes.js');
    expect(router.stack.some(layer => layer.route && layer.route.path === '/:id')).toBe(true);
  });

  test('DELETE /:id route exists', () => {
    router = require('../../src/routes/user_routes.js');
    expect(router.stack.some(layer => layer.route && layer.route.path === '/:id')).toBe(true);
  });
});
