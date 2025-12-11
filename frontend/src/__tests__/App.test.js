import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => null,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('App Component', () => {
  test('renders the main app container', () => {
    render(<App />);
    const appElement = document.querySelector('.app');
    expect(appElement).toBeInTheDocument();
  });

  test('renders navigation bar', () => {
    render(<App />);
    const navbar = document.querySelector('.navbar');
    expect(navbar).toBeInTheDocument();
  });

  test('renders main content area', () => {
    render(<App />);
    const mainContent = document.querySelector('.main-content');
    expect(mainContent).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    const footer = document.querySelector('.footer');
    expect(footer).toBeInTheDocument();
  });

  test('contains Microservices Portal in navbar', () => {
    render(<App />);
    const logo = screen.getByText(/Microservices Portal/i);
    expect(logo).toBeInTheDocument();
  });
});
