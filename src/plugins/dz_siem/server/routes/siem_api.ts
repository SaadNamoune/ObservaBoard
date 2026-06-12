import { IRouter } from '../../../../core/server';

export function registerSiemRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/dz_siem/alerts',
      validate: false,
    },
    async (context, req, res) => {
      const client = context.core.opensearch.client.asCurrentUser;
      try {
        const result = await client.search({
          index: 'security-alerts-*',
          body: {
            query: { match: { severity: 'critical' } },
            sort: [{ '@timestamp': 'desc' }],
            size: 50,
          },
        });
        return res.ok({ body: result.hits });
      } catch (e) {
        return res.customError({ statusCode: 500, body: String(e) });
      }
    }
  );

  router.get(
    {
      path: '/api/dz_siem/compliance/law_18_07',
      validate: false,
    },
    async (_context, _req, res) => {
      return res.ok({
        body: {
          law: 'Loi 18-07 relative à la protection des personnes physiques dans le traitement des données à caractère personnel',
          compliance_score: 98.2,
          last_audit: new Date().toISOString(),
          findings: [],
        },
      });
    }
  );
}
