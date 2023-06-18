import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('Card component', () => {
  it('should render a default card without a navigation link', () => {
    const cardTitle = 'Card Title';
    render(<Card cardTitle={cardTitle} />);

    expect(screen.getByText(cardTitle)).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('should render a card with a navigation link', () => {
    const cardTitle = 'Card Title';
    const navigationLink = '/some-route';
    render(
      <MemoryRouter>
        <Card cardTitle={cardTitle} navigationLink={navigationLink} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', navigationLink);
    expect(screen.queryByText(cardTitle)).not.toBeInTheDocument();
  });
});
