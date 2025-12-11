import axios from 'axios';

// API Base URLs for microservices
const API_BASE_URLS = {
  user: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:8001',
  merchant: process.env.REACT_APP_MERCHANT_SERVICE_URL || 'http://localhost:8002',
  order: process.env.REACT_APP_ORDER_SERVICE_URL || 'http://localhost:8003',
  offer: process.env.REACT_APP_OFFER_SERVICE_URL || 'http://localhost:8004',
  payment: process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:8005',
  notification: process.env.REACT_APP_NOTIFICATION_SERVICE_URL || 'http://localhost:8006',
};

// Create axios instances for each service
export const userAPI = axios.create({
  baseURL: API_BASE_URLS.user,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const merchantAPI = axios.create({
  baseURL: API_BASE_URLS.merchant,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderAPI = axios.create({
  baseURL: API_BASE_URLS.order,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const offerAPI = axios.create({
  baseURL: API_BASE_URLS.offer,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const paymentAPI = axios.create({
  baseURL: API_BASE_URLS.payment,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notificationAPI = axios.create({
  baseURL: API_BASE_URLS.notification,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error interceptor for all APIs
const setupErrorInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );
};

setupErrorInterceptor(userAPI);
setupErrorInterceptor(merchantAPI);
setupErrorInterceptor(orderAPI);
setupErrorInterceptor(offerAPI);
setupErrorInterceptor(paymentAPI);
setupErrorInterceptor(notificationAPI);

export default {
  user: userAPI,
  merchant: merchantAPI,
  order: orderAPI,
  offer: offerAPI,
  payment: paymentAPI,
  notification: notificationAPI,
};
