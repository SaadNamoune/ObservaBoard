import { HttpSetup } from 'opensearch-dashboards/public';

export interface SemanticSearchResult {
  log_id: string;
  message: string;
  score: number;
  timestamp: string;
  host: string;
  severity: string;
  index: string;
}

export interface VectorlogQueryOptions {
  query: string;
  k?: number;
  minScore?: number;
  indexPattern?: string;
}

/**
 * Client for VectorLog-Engine semantic log search.
 * Wraps the /api/dz_siem/vectorlog/* proxy endpoints which forward
 * to the VectorLog-Engine OpenSearch k-NN index (vectorlog-logs-*).
 */
export class VectorlogClient {
  private readonly http: HttpSetup;

  constructor(http: HttpSetup) {
    this.http = http;
  }

  async semanticSearch(options: VectorlogQueryOptions): Promise<SemanticSearchResult[]> {
    const { query, k = 10, minScore = 0.6, indexPattern = 'vectorlog-logs-*' } = options;
    const response = await this.http.post('/api/dz_siem/vectorlog/search', {
      body: JSON.stringify({ query, k, min_score: minScore, index_pattern: indexPattern }),
    });
    return (response as any).results ?? [];
  }

  async getClusterStats(): Promise<{ total_logs: number; indexed_embeddings: number; avg_query_ms: number }> {
    const response = await this.http.get('/api/dz_siem/vectorlog/stats');
    return response as any;
  }

  async detectAnomalies(windowMinutes: number = 60): Promise<{ anomaly_score: number; suspicious_logs: SemanticSearchResult[] }> {
    const response = await this.http.post('/api/dz_siem/vectorlog/anomalies', {
      body: JSON.stringify({ window_minutes: windowMinutes }),
    });
    return response as any;
  }
}
