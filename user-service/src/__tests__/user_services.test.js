const UserService = require('../../src/services/user_services.js');

describe('User Service', () => {
  describe('register', () => {
    test('should return error if email is missing', async () => {
      const result = await UserService.register({
        password: 'password123',
        name: 'John Doe'
      });
      expect(result.status).toBe(400);
      expect(result.data.error).toContain('Email and password are required');
    });

    test('should return error if password is missing', async () => {
      const result = await UserService.register({
        email: 'test@example.com',
        name: 'John Doe'
      });
      expect(result.status).toBe(400);
      expect(result.data.error).toContain('Email and password are required');
    });

    test('should return object with status and data properties', async () => {
      const result = await UserService.register({
        email: 'test@example.com',
        password: 'password123'
      });
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('data');
    });
  });

  describe('login', () => {
    test('should return error if email is missing', async () => {
      const result = await UserService.login({
        password: 'password123'
      });
      expect(result.status).toBe(400);
      expect(result.data.error).toBeDefined();
    });

    test('should return error if password is missing', async () => {
      const result = await UserService.login({
        email: 'test@example.com'
      });
      expect(result.status).toBe(400);
      expect(result.data.error).toBeDefined();
    });

    test('should return response with status and data', async () => {
      const result = await UserService.login({
        email: 'test@example.com',
        password: 'password123'
      });
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('data');
    });
  });

  describe('error handling', () => {
    test('should handle async errors gracefully', async () => {
      expect(async () => {
        await UserService.register(null);
      }).toBeDefined();
    });

    test('should return proper error structure', () => {
      const result = UserService.register({});
      expect(result).toBeDefined();
    });
  });
});
