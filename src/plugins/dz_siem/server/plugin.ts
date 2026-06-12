import { CoreSetup, CoreStart, Plugin, Logger } from 'opensearch-dashboards/server';
import { registerSiemRoutes } from './routes/siem_api';
import { registerComplianceRoutes } from './routes/compliance_api';
import { registerThreatIntelRoutes } from './routes/threat_intel_api';

export class DzSiemServerPlugin implements Plugin {
  private readonly logger: Logger;

  constructor(initContext: { logger: { get: () => Logger } }) {
    this.logger = initContext.logger.get();
  }

  setup(core: CoreSetup) {
    this.logger.info('dz_siem: setting up server-side routes');
    const router = core.http.createRouter();
    registerSiemRoutes(router);
    registerComplianceRoutes(router);
    registerThreatIntelRoutes(router);
  }

  start(_core: CoreStart) {
    this.logger.info('dz_siem: server plugin started');
  }

  stop() {
    this.logger.info('dz_siem: server plugin stopped');
  }
}
