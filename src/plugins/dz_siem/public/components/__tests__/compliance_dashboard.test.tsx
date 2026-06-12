import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComplianceDashboard } from '../compliance_dashboard';

describe('ComplianceDashboard', () => {
  it('renders the Law 18-07 title', () => {
    render(<ComplianceDashboard />);
    expect(screen.getByText(/Loi 18-07/i)).toBeInTheDocument();
  });

  it('renders compliance control articles', () => {
    render(<ComplianceDashboard />);
    expect(screen.getByText('Art. 4')).toBeInTheDocument();
    expect(screen.getByText('Art. 30')).toBeInTheDocument();
  });

  it('renders status badges including non-compliant', () => {
    render(<ComplianceDashboard />);
    const badges = screen.getAllByText(/Conforme|Partiel|Non conforme/);
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('renders overall score stat', () => {
    render(<ComplianceDashboard />);
    expect(screen.getByText(/Score global ANPDP/)).toBeInTheDocument();
  });
});
