import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThreatIntelPanel } from '../threat_intel_panel';

describe('ThreatIntelPanel', () => {
  it('renders the threat intel title with Arabic and French labels', () => {
    render(<ThreatIntelPanel />);
    expect(screen.getByText(/CERT-DZ.*ANSSI-DZ/i)).toBeInTheDocument();
  });

  it('renders IOC table with mock entries after mount', async () => {
    render(<ThreatIntelPanel />);
    await waitFor(() => {
      expect(screen.getByText('CERT-DZ')).toBeInTheDocument();
      expect(screen.getByText('ANSSI-DZ')).toBeInTheDocument();
      expect(screen.getByText('MISP-DZ')).toBeInTheDocument();
    });
  });

  it('renders confidence percentages', async () => {
    render(<ThreatIntelPanel />);
    await waitFor(() => {
      expect(screen.getByText('95%')).toBeInTheDocument();
      expect(screen.getByText('88%')).toBeInTheDocument();
    });
  });

  it('renders type badges for ip, domain, hash', async () => {
    render(<ThreatIntelPanel />);
    await waitFor(() => {
      expect(screen.getByText('ip')).toBeInTheDocument();
      expect(screen.getByText('domain')).toBeInTheDocument();
      expect(screen.getByText('hash')).toBeInTheDocument();
    });
  });
});
