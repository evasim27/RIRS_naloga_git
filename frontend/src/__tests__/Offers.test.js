import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Offers from '../pages/Offers';
import * as api from '../config/api';

jest.mock('../config/api', () => ({
  offerAPI: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('Offers Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Offers Management heading', () => {
    api.offerAPI.get.mockResolvedValue({ data: [] });
    render(<Offers />);
    return screen.findByText(/Offers Management/i).then(heading => {
      expect(heading).toBeInTheDocument();
    });
  });

  test('renders offer creation form with all fields', () => {
    api.offerAPI.get.mockResolvedValue({ data: [] });
    render(<Offers />);
    return Promise.all([
      screen.findByPlaceholderText(/Offer Title/i),
      screen.findByPlaceholderText(/Description/i),
      screen.findByPlaceholderText(/Discount %/i),
    ]).then(([t, d, p]) => {
      expect(t).toBeInTheDocument();
      expect(d).toBeInTheDocument();
      expect(p).toBeInTheDocument();
    });
  });

  test('displays offers list from API', async () => {
    const mockOffers = [
      { id: 1, title: 'Summer Sale', description: '50% off', discount_percentage: 50 },
      { id: 2, title: 'Winter Deal', description: '30% off', discount_percentage: 30 },
    ];
    api.offerAPI.get.mockResolvedValue({ data: mockOffers });
    render(<Offers />);
    await waitFor(() => {
      expect(screen.getByText('Summer Sale')).toBeInTheDocument();
      expect(screen.getByText('Winter Deal')).toBeInTheDocument();
    });
  });

  test('displays discount percentage in list', async () => {
    const mockOffers = [
      { id: 1, title: 'Sale', description: '50% off', discount_percentage: 50 },
    ];
    api.offerAPI.get.mockResolvedValue({ data: mockOffers });
    render(<Offers />);
    await waitFor(() => {
      expect(screen.getByText(/Discount: 50%/i)).toBeInTheDocument();
    });
  });

  test('handles offer creation submission', async () => {
    api.offerAPI.get.mockResolvedValue({ data: [] });
    api.offerAPI.post.mockResolvedValue({ data: { id: 1 } });
    global.alert = jest.fn();
    
    render(<Offers />);
    
    const titleInput = screen.getByPlaceholderText(/Offer Title/i);
    const descInput = screen.getByPlaceholderText(/Description/i);
    const discountInput = screen.getByPlaceholderText(/Discount %/i);
    const submitButton = screen.getByText(/Create Offer/i);
    
    fireEvent.change(titleInput, { target: { value: 'New Offer' } });
    fireEvent.change(descInput, { target: { value: 'Great deal' } });
    fireEvent.change(discountInput, { target: { value: '25' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(api.offerAPI.post).toHaveBeenCalled();
    });
  });

  test('renders no offers message when empty', async () => {
    api.offerAPI.get.mockResolvedValue({ data: [] });
    render(<Offers />);
    await waitFor(() => {
      expect(screen.getByText(/No offers found/i)).toBeInTheDocument();
    });
  });
});
