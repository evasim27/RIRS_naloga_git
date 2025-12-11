import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from '../pages/Users';
import * as api from '../config/api';

jest.mock('../config/api', () => ({
  userAPI: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('Users Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Users Management heading', () => {
    api.userAPI.get.mockResolvedValue({ data: [] });
    render(<Users />);
    const heading = screen.getByText(/Users Management/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders create user form', () => {
    api.userAPI.get.mockResolvedValue({ data: [] });
    render(<Users />);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('displays loading state', async () => {
    api.userAPI.get.mockImplementation(() => new Promise(() => {}));
    render(<Users />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    api.userAPI.get.mockRejectedValue(new Error('Network error'));
    render(<Users />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch users/i)).toBeInTheDocument();
    });
  });

  test('displays users list when data is fetched', async () => {
    const mockUsers = [
      { id: 1, username: 'john', email: 'john@example.com' },
      { id: 2, username: 'jane', email: 'jane@example.com' },
    ];
    api.userAPI.get.mockResolvedValue({ data: mockUsers });
    render(<Users />);
    await waitFor(() => {
      expect(screen.getByText('john')).toBeInTheDocument();
      expect(screen.getByText('jane')).toBeInTheDocument();
    });
  });

  test('handles form submission', async () => {
    api.userAPI.get.mockResolvedValue({ data: [] });
    api.userAPI.post.mockResolvedValue({ data: { id: 1 } });
    global.alert = jest.fn();
    
    render(<Users />);
    
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByText(/Create User/i);
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(api.userAPI.post).toHaveBeenCalled();
    });
  });

  test('shows no users message when list is empty', async () => {
    api.userAPI.get.mockResolvedValue({ data: [] });
    render(<Users />);
    await waitFor(() => {
      expect(screen.getByText(/No users found/i)).toBeInTheDocument();
    });
  });
});
