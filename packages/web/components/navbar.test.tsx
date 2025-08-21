import { render, screen } from '@testing-library/react';
import { Navbar } from './navbar';
import AuthProvider from './AuthProvider';

describe('Navbar', () => {
  it('renders a link to the home page', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );
    const homeLink = screen.getByRole('link', { name: /JinoShare/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});