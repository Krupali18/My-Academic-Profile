import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renders site footer with landmark role', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('site-footer');
  });

  it('renders the research mission tagline', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("Let's push the frontiers of science together.")).toBeInTheDocument();
  });

  it('renders social and scholarly links with proper aria-labels and targets', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const linkedIn = screen.getByLabelText('LinkedIn');
    expect(linkedIn).toBeInTheDocument();
    expect(linkedIn.getAttribute('href')).toBe('https://www.linkedin.com/in/krupalidonda/');
    expect(linkedIn.getAttribute('target')).toBe('_blank');

    const scholar = screen.getByLabelText('Google Scholar');
    expect(scholar).toBeInTheDocument();
    expect(scholar.getAttribute('href')).toContain('scholar.google.com');

    const rg = screen.getByLabelText('ResearchGate');
    expect(rg).toBeInTheDocument();
    expect(rg.getAttribute('href')).toContain('researchgate.net');
  });
});
