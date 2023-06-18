import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders the title correctly', () => {
    const title = 'My Dashboard';
    render(
      <Router>
        <Dashboard title={title} />
      </Router>
    );
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the navigation links correctly', () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );
    const homeLink = screen.getByText('Home');
    const playgroundLink = screen.getByText('Playground');
    expect(homeLink).toBeInTheDocument();
    expect(playgroundLink).toBeInTheDocument();
  });
});