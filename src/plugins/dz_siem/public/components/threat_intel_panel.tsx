import React, { useState, useEffect } from 'react';
import { EuiBasicTable, EuiBadge, EuiTitle } from '@elastic/eui';

interface IocEntry {
  ioc: string;
  type: 'ip' | 'domain' | 'hash';
  source: string;
  confidence: number;
  region: string;
}

const MOCK_IOCS: IocEntry[] = [
  { ioc: '41.111.x.x', type: 'ip', source: 'CERT-DZ', confidence: 95, region: 'DZ' },
  { ioc: 'malware-dz.example', type: 'domain', source: 'ANSSI-DZ', confidence: 88, region: 'Maghreb' },
  { ioc: 'a1b2c3d4...', type: 'hash', source: 'MISP-DZ', confidence: 72, region: 'Global' },
];

const columns = [
  { field: 'ioc', name: 'IOC / المؤشر' },
  { field: 'type', name: 'Type', render: (t: string) => <EuiBadge>{t}</EuiBadge> },
  { field: 'source', name: 'Source' },
  { field: 'confidence', name: 'Confidence %', render: (c: number) => `${c}%` },
  { field: 'region', name: 'Region / المنطقة' },
];

export const ThreatIntelPanel: React.FC = () => {
  const [iocs, setIocs] = useState<IocEntry[]>([]);
  useEffect(() => { setIocs(MOCK_IOCS); }, []);

  return (
    <div>
      <EuiTitle size="s"><h3>مؤشرات التهديد / Threat Intelligence — CERT-DZ + ANSSI-DZ</h3></EuiTitle>
      <EuiBasicTable items={iocs} columns={columns} />
    </div>
  );
};
