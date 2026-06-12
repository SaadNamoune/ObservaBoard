import React, { useState, useEffect } from 'react';
import {
  EuiPanel,
  EuiTitle,
  EuiStat,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
  EuiBasicTable,
  EuiSpacer,
  EuiProgress,
} from '@elastic/eui';

interface ComplianceControl {
  article: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  score: number;
}

const LAW_18_07_CONTROLS: ComplianceControl[] = [
  {
    article: 'Art. 4',
    description: 'Consentement explicite au traitement des données personnelles',
    status: 'compliant',
    score: 100,
  },
  {
    article: 'Art. 9',
    description: 'Déclaration auprès de l\'ANPDP — Autorité Nationale de Protection des Données',
    status: 'compliant',
    score: 100,
  },
  {
    article: 'Art. 13',
    description: 'Droit d\'accès et de rectification des données personnelles',
    status: 'partial',
    score: 65,
  },
  {
    article: 'Art. 18',
    description: 'Transfert transfrontalier de données — approbation requise',
    status: 'compliant',
    score: 100,
  },
  {
    article: 'Art. 25',
    description: 'Obligations de sécurité et mesures techniques/organisationnelles',
    status: 'partial',
    score: 78,
  },
  {
    article: 'Art. 30',
    description: 'Notification de violation de données à l\'ANPDP sous 72h',
    status: 'non-compliant',
    score: 20,
  },
  {
    article: 'Art. 35',
    description: 'Délégué à la protection des données (DPD) nommé',
    status: 'compliant',
    score: 100,
  },
];

const statusColor = (s: ComplianceControl['status']): string => {
  if (s === 'compliant') return 'success';
  if (s === 'partial') return 'warning';
  return 'danger';
};

const columns = [
  { field: 'article', name: 'Article', width: '80px' },
  { field: 'description', name: 'Obligation légale' },
  {
    field: 'status',
    name: 'Statut',
    render: (s: ComplianceControl['status']) => (
      <EuiBadge color={statusColor(s)}>
        {s === 'compliant' ? 'Conforme' : s === 'partial' ? 'Partiel' : 'Non conforme'}
      </EuiBadge>
    ),
  },
  {
    field: 'score',
    name: 'Score',
    render: (score: number) => (
      <EuiProgress value={score} max={100} size="s" color={score >= 80 ? 'success' : score >= 50 ? 'warning' : 'danger'} />
    ),
  },
];

export const ComplianceDashboard: React.FC = () => {
  const [controls, setControls] = useState<ComplianceControl[]>([]);

  useEffect(() => {
    setControls(LAW_18_07_CONTROLS);
  }, []);

  const overallScore = Math.round(
    controls.reduce((sum, c) => sum + c.score, 0) / Math.max(controls.length, 1)
  );
  const compliantCount = controls.filter((c) => c.status === 'compliant').length;
  const partialCount = controls.filter((c) => c.status === 'partial').length;
  const nonCompliantCount = controls.filter((c) => c.status === 'non-compliant').length;

  return (
    <EuiPanel>
      <EuiTitle size="m">
        <h2>Tableau de conformité — Loi 18-07 / قانون 18-07</h2>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiStat title={`${overallScore}%`} description="Score global ANPDP" titleColor={overallScore >= 80 ? 'success' : 'warning'} />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat title={compliantCount} description="Articles conformes" titleColor="success" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat title={partialCount} description="Conformité partielle" titleColor="warning" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat title={nonCompliantCount} description="Non conformes" titleColor="danger" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <EuiBasicTable items={controls} columns={columns} rowProps={(item) => ({ style: { opacity: item.status === 'non-compliant' ? 0.9 : 1 } })} />
    </EuiPanel>
  );
};
