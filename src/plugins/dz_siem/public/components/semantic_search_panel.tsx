import React, { useState, useCallback } from 'react';
import {
  EuiFieldSearch,
  EuiBasicTable,
  EuiBadge,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiLoadingSpinner,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { VectorlogClient, SemanticSearchResult } from '../services/vectorlog_client';

interface SemanticSearchPanelProps {
  vectorlogClient: VectorlogClient;
}

const severityColor = (s: string): string => {
  if (s === 'critical') return 'danger';
  if (s === 'high') return 'warning';
  if (s === 'medium') return 'primary';
  return 'default';
};

const columns = [
  { field: 'score', name: 'Score', width: '65px', render: (s: number) => `${(s * 100).toFixed(0)}%` },
  { field: 'timestamp', name: 'Timestamp', width: '160px', render: (t: string) => new Date(t).toLocaleString('fr-DZ') },
  { field: 'host', name: 'Host', width: '130px' },
  {
    field: 'severity',
    name: 'Gravité',
    width: '80px',
    render: (s: string) => <EuiBadge color={severityColor(s)}>{s}</EuiBadge>,
  },
  { field: 'message', name: 'Message journal' },
];

export const SemanticSearchPanel: React.FC<SemanticSearchPanelProps> = ({ vectorlogClient }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SemanticSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const hits = await vectorlogClient.semanticSearch({ query, k: 20 });
      setResults(hits);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, [query, vectorlogClient]);

  return (
    <EuiPanel>
      <EuiTitle size="s">
        <h3>Recherche sémantique / البحث الدلالي — VectorLog-Engine</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" color="subdued">
        <p>Recherche vectorielle k-NN (cosine, HNSW m=16) sur 384-dim embeddings all-MiniLM-L6-v2</p>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFieldSearch
            placeholder="Ex: tentative d'authentification SSH échouée depuis adresse inconnue…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            isLoading={loading}
            fullWidth
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      {loading && <EuiLoadingSpinner size="l" />}
      {!loading && searched && results.length === 0 && (
        <EuiText color="subdued"><p>Aucun résultat trouvé.</p></EuiText>
      )}
      {!loading && results.length > 0 && (
        <>
          <EuiText size="s"><p><strong>{results.length}</strong> journaux similaires trouvés</p></EuiText>
          <EuiSpacer size="s" />
          <EuiBasicTable items={results} columns={columns} tableCaption="Résultats de recherche sémantique" />
        </>
      )}
    </EuiPanel>
  );
};
