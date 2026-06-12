import { CoreSetup, CoreStart, Plugin, PluginInitializerContext } from '../../../core/public';

export interface DzSiemSetup {}
export interface DzSiemStart {}

export class DzSiemPlugin implements Plugin<DzSiemSetup, DzSiemStart> {
  constructor(private readonly initializerContext: PluginInitializerContext) {}

  public setup(core: CoreSetup): DzSiemSetup {
    core.application.register({
      id: 'dz_siem',
      title: 'DZ SIEM',
      order: 1000,
      async mount(params) {
        const { renderApp } = await import('./application');
        return renderApp(params);
      },
    });

    return {};
  }

  public start(core: CoreStart): DzSiemStart {
    return {};
  }

  public stop() {}
}
