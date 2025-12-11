import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Payments from '../pages/Payments';
import * as api from '../config/api';

jest.mock('../config/api', () => ({
  paymentAPI: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('Payments Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Payments Management heading', () => {
    api.paymentAPI.get.mockResolvedValue({ data: [] });
    render(<Payments />);
    expect(screen.getByText(/Payments Management/i)).toBeInTheDocument();
  });

  test('renders all payment form fields', () => {
    api.paymentAPI.get.mockResolvedValue({ data: [] });
    render(<Payments />);
    expect(screen.getByPlaceholderText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Card Holder Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/MM\/YY/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/CVV/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Amount/i)).toBeInTheDocument();
  });

  test('displays payment transactions', async () => {
    const mockPayments = [
      { id: 1, amount: 100.00, status: 'Completed' },
      { id: 2, amount: 50.00, status: 'Pending' },
    ];
    api.paymentAPI.get.mockResolvedValue({ data: mockPayments });
    render(<Payments />);
    await waitFor(() => {
      expect(screen.getByText(/Payment #1/i)).toBeInTheDocument();
      // component renders numbers without fixed decimals; match more loosely
      expect(screen.getByText(/\$100/)).toBeInTheDocument();
    });
  });

  test('handles payment form submission', async () => {
    api.paymentAPI.get.mockResolvedValue({ data: [] });
    api.paymentAPI.post.mockResolvedValue({ data: { id: 1 } });
    global.alert = jest.fn();
    
    render(<Payments />);
    
    fireEvent.change(screen.getByPlaceholderText(/Card Number/i), { 
      target: { value: '4111111111111111' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Card Holder Name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/MM\/YY/i), { 
      target: { value: '12/25' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/CVV/i), { 
      target: { value: '123' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), { 
      target: { value: '99.99' } 
    });
    
    // prefer button role to avoid matching the heading text
    fireEvent.click(screen.getByRole('button', { name: /Process Payment/i }));
    
    await waitFor(() => {
      expect(api.paymentAPI.post).toHaveBeenCalled();
    });
  });

  test('displays no payments message', async () => {
    api.paymentAPI.get.mockResolvedValue({ data: [] });
    render(<Payments />);
    await waitFor(() => {
      expect(screen.getByText(/No payments found/i)).toBeInTheDocument();
    });
  });
});
