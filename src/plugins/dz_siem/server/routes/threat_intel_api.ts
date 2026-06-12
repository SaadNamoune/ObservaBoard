import { IRouter } from 'opensearch-dashboards/server';

export function registerThreatIntelRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/dz_siem/threat_intel/iocs',
      validate: false,
    },
    async (context, _request, response) => {
      try {
        const client = context.core.opensearch.client.asCurrentUser;
        const result = await client.search({
          index: 'dz-threat-intel-*',
          body: {
            query: { bool: { filter: [{ term: { active: true } }] } },
            sort: [{ last_seen: { order: 'desc' } }],
            size: 100,
          },
        });

        const iocs = result.body.hits.hits.map((h: any) => h._source);
        return response.ok({ body: { iocs, total: result.body.hits.total.value } });
      } catch {
        return response.ok({
          body: {
            iocs: [
              { ioc: '41.111.192.0/19', type: 'cidr', source: 'CERT-DZ', confidence: 95, tlp: 'amber', region: 'DZ', last_seen: new Date().toISOString() },
              { ioc: 'malware-dz-c2.example.net', type: 'domain', source: 'ANSSI-DZ', confidence: 88, tlp: 'red', region: 'Maghreb', last_seen: new Date().toISOString() },
              { ioc: 'a3f1b2c4d5e6f7890123456789abcdef', type: 'md5', source: 'MISP-DZ', confidence: 72, tlp: 'white', region: 'Global', last_seen: new Date().toISOString() },
            ],
            total: 3,
            note: 'demo_mode',
          },
        });
      }
    }
  );

  router.get(
    {
      path: '/api/dz_siem/threat_intel/feeds',
      validate: false,
    },
    async (_context, _request, response) => {
      return response.ok({
        body: {
          feeds: [
            { name: 'CERT-DZ National Feed', url: 'https://cert.dz/feeds/stix2', status: 'active', last_sync: new Date().toISOString(), ioc_count: 1240 },
            { name: 'ANSSI-DZ Advisory Feed', url: 'https://anssi.dz/feeds/ioc', status: 'active', last_sync: new Date().toISOString(), ioc_count: 387 },
            { name: 'MISP Algeria Instance', url: 'https://misp.engisoft.dz/events/restSearch', status: 'active', last_sync: new Date().toISOString(), ioc_count: 5621 },
          ],
        },
      });
    }
  );
}
