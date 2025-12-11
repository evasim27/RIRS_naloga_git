import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../pages/Dashboard';

describe('Dashboard Component', () => {
  test('renders dashboard heading', () => {
    render(<Dashboard />);
    const heading = screen.getByText(/Dashboard/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders welcome message', () => {
    render(<Dashboard />);
    const message = screen.getByText(/Welcome to the Microservices Platform/i);
    expect(message).toBeInTheDocument();
  });

  test('renders service cards', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Users Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Merchants Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Orders Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Offers Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Payments Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications Service/i)).toBeInTheDocument();
  });

  test('renders cards grid container', () => {
    render(<Dashboard />);
    const grid = document.querySelector('.cards-grid');
    expect(grid).toBeInTheDocument();
  });

  test('renders platform overview section', () => {
    render(<Dashboard />);
    const overview = screen.getByText(/Platform Overview/i);
    expect(overview).toBeInTheDocument();
  });
});
