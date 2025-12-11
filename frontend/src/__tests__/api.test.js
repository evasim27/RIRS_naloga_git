import axios from 'axios';
import { userAPI, merchantAPI, orderAPI, offerAPI, paymentAPI, notificationAPI } from '../config/api';

describe('API Configuration', () => {
  test('userAPI instance is created', () => {
    expect(userAPI).toBeDefined();
    expect(userAPI.defaults.baseURL).toBeDefined();
  });

  test('merchantAPI instance is created', () => {
    expect(merchantAPI).toBeDefined();
    expect(merchantAPI.defaults.baseURL).toBeDefined();
  });

  test('orderAPI instance is created', () => {
    expect(orderAPI).toBeDefined();
    expect(orderAPI.defaults.baseURL).toBeDefined();
  });

  test('offerAPI instance is created', () => {
    expect(offerAPI).toBeDefined();
    expect(offerAPI.defaults.baseURL).toBeDefined();
  });

  test('paymentAPI instance is created', () => {
    expect(paymentAPI).toBeDefined();
    expect(paymentAPI.defaults.baseURL).toBeDefined();
  });

  test('notificationAPI instance is created', () => {
    expect(notificationAPI).toBeDefined();
    expect(notificationAPI.defaults.baseURL).toBeDefined();
  });

  test('all APIs have Content-Type header set', () => {
    expect(userAPI.defaults.headers['Content-Type']).toBe('application/json');
    expect(merchantAPI.defaults.headers['Content-Type']).toBe('application/json');
  });
});
