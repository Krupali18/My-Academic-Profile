import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { SiteSettings } from '@/types/settings.types';

const mockSettings: SiteSettings = {
  title: 'Dr. Krupali Donda',
  subtitle: 'Assistant Professor, Adani University',
  designation: 'Assistant Professor',
  affiliation: {
    institution: 'Adani University',
    department: 'Department of Physics',
    address: 'Ahmedabad, Gujarat',
    country: 'India',
  },
  alumniOf: {
    institution: 'University of Lorraine',
    country: 'France',
  },
  email: 'krupali.donda@adaniuni.ac.in',
  contactUrl: '/contact',
  heroImage: '/images/hero.webp',
  footerText: 'Thank you for visiting.',
  socialLinks: [
    {
      id: 's1',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/krupali-donda',
      icon: 'linkedin',
      ariaLabel: 'LinkedIn Profile',
    },
  ],
  navigation: {
    primary: [
      { id: 'n1', label: 'Home', href: '/', order: 1 },
      { id: 'n2', label: 'About', href: '/about', order: 2 },
      { id: 'n3', label: 'Research', href: '/research', order: 3 },
      { id: 'n4', label: 'Contact', href: '/contact', order: 4, isCta: true },
    ],
    footer: [
      { id: 'f1', label: 'About', href: '/about', order: 1 },
      { id: 'f2', label: 'Research', href: '/research', order: 2 },
    ],
  },
};

describe('Header Component (MD File 09)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders skip-to-content link as first element inside header', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header settings={mockSettings} />
      </MemoryRouter>
    );

    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink.getAttribute('href')).toBe('#main-content');
    expect(skipLink).toHaveClass('sr-only');
  });

  it('renders brand logo link navigating to homepage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header settings={mockSettings} />
      </MemoryRouter>
    );

    const brandLink = screen.getByRole('link', { name: /dr\. krupali donda/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink.getAttribute('href')).toBe('/');
  });

  it('renders primary desktop navigation and CTA button', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header settings={mockSettings} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Research' })).toBeInTheDocument();

    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0].getAttribute('href')).toBe('/contact');
  });

  it('Mode A (Homepage): starts transparent and switches to dark on scroll > 10px', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Header settings={mockSettings} />
      </MemoryRouter>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-transparent');

    // Simulate scrolling past 10px
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(header).toHaveClass('bg-black');
  });

  it('Mode B (Subpages): always dark regardless of scroll position', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <Header settings={mockSettings} />
      </MemoryRouter>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-black');
  });

  it('toggles mobile menu with hamburger button and updates aria-expanded', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header settings={mockSettings} />
      </MemoryRouter>
    );

    const toggleBtn = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Open mobile menu
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /mobile navigation menu/i })).toBeInTheDocument();

    // Close mobile menu
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
