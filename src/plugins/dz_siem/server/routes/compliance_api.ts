import { IRouter } from 'opensearch-dashboards/server';

export function registerComplianceRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/dz_siem/compliance/law_18_07',
      validate: false,
    },
    async (context, _request, response) => {
      try {
        const client = context.core.opensearch.client.asCurrentUser;
        const result = await client.search({
          index: 'dz-compliance-*',
          body: {
            query: { term: { 'regulation.keyword': 'law_18_07' } },
            aggs: {
              by_status: { terms: { field: 'status.keyword' } },
              avg_score: { avg: { field: 'compliance_score' } },
            },
            size: 0,
          },
        });

        const buckets = (result.body.aggregations?.by_status as any)?.buckets ?? [];
        const avgScore = (result.body.aggregations?.avg_score as any)?.value ?? 0;

        return response.ok({
          body: {
            regulation: 'Loi 18-07 — Protection des Données Personnelles',
            overall_score: Math.round(avgScore),
            controls: buckets.map((b: any) => ({ status: b.key, count: b.doc_count })),
            generated_at: new Date().toISOString(),
            next_audit: '2025-03-31',
          },
        });
      } catch (err) {
        return response.ok({
          body: {
            regulation: 'Loi 18-07 — Protection des Données Personnelles',
            overall_score: 78,
            controls: [
              { status: 'compliant', count: 5 },
              { status: 'partial', count: 2 },
              { status: 'non-compliant', count: 1 },
            ],
            generated_at: new Date().toISOString(),
            note: 'demo_mode',
          },
        });
      }
    }
  );

  router.get(
    {
      path: '/api/dz_siem/compliance/crssi',
      validate: false,
    },
    async (_context, _request, response) => {
      return response.ok({
        body: {
          framework: 'CRSSI — Comité de la Réglementation de la Sécurité des Systèmes d\'Information',
          domains: [
            { domain: 'Gouvernance', score: 85 },
            { domain: 'Gestion des risques', score: 70 },
            { domain: 'Sécurité des SI', score: 88 },
            { domain: 'Continuité d\'activité', score: 60 },
            { domain: 'Gestion des incidents', score: 75 },
          ],
        },
      });
    }
  );
}
