import { render, screen, act } from '@testing-library/react';
import { Navbar } from './navbar';
import AuthProvider from './AuthProvider';

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  SessionProvider: ({ children }) => <>{children}</>,
}));

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