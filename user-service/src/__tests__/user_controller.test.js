jest.mock('../models/user_model.js');

describe('User Controller', () => {
  let controller;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('controller module exists', () => {
    expect(() => {
      controller = require('../../src/controllers/user_controller.js');
    }).not.toThrow();
  });

  test('register function exists', () => {
    controller = require('../../src/controllers/user_controller.js');
    expect(controller.register).toBeDefined();
  });

  test('login function exists', () => {
    controller = require('../../src/controllers/user_controller.js');
    expect(controller.login).toBeDefined();
  });

  test('getAllUsers function exists', () => {
    controller = require('../../src/controllers/user_controller.js');
    expect(controller.getAllUsers).toBeDefined();
  });

  test('getUserById function exists', () => {
    controller = require('../../src/controllers/user_controller.js');
    expect(controller.getUserById).toBeDefined();
  });

  test('updateUser function exists', () => {
    controller = require('../../src/controllers/user_controller.js');
    expect(controller.updateUser).toBeDefined();
  });
});
