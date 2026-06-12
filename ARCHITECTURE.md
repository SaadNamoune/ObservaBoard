# Architecture — ObservaBoard

## System Overview

ObservaBoard is a layered observability platform built on OpenSearch Dashboards (OSD) with custom DZ SIEM plugins on top.

```
┌─────────────────────────────────────────────────────────────────┐
│                      ObservaBoard                               │
│                                                                 │
│  SIEM Layer (DZ Plugins)                                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐   │
│  │  dz_siem     │ │ dz_compliance│ │  dz_threat_intel     │   │
│  │  Security    │ │ Law 18-07    │ │  CERT-DZ + ANSSI-DZ  │   │
│  │  Dashboard   │ │ Audit Report │ │  IOC Feed Panel      │   │
│  └──────────────┘ └──────────────┘ └──────────────────────┘   │
│                                                                 │
│  Integration Layer                                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  VectorLog-Engine (semantic k-NN log search)             │  │
│  │  OpenSearch ML (anomaly detection, forecasting)          │  │
│  │  Alerting + Notifications (SMTP, Slack, PagerDuty)      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  OSD Core (Upstream OpenSearch Dashboards 2.13)               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Core Platform │ Visualizations │ Saved Objects          │  │
│  │  React 18 + EUI │ Data Plugin  │ i18n (ar-DZ, fr-DZ)   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Backend (Node.js 22 + Hapi.js)                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /api/dz_siem/* │ /api/dz_compliance/* │ /api/dz_ti/*  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                    │
└───────────────────────────┼────────────────────────────────────┘
                            │ OpenSearch HTTP API
┌───────────────────────────▼────────────────────────────────────┐
│              OpenSearch 2.13 Cluster                           │
│  ┌──────────────────────┐  ┌──────────────────────────────┐   │
│  │  security-alerts-*   │  │  vectorlog-logs-*             │   │
│  │  (ECS schema)        │  │  (k-NN 384-dim embeddings)   │   │
│  └──────────────────────┘  └──────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

## DZ Plugin Architecture

Each DZ plugin follows OSD's standard plugin lifecycle:

```typescript
// Setup: register application + API routes
setup(core, deps) {
  core.application.register({ id: 'dz_siem', ... })
  router.get('/api/dz_siem/alerts', handler)
}
```

## Data Flow: SIEM Alert Processing

```
Log Source (Syslog/Windows/API)
         │
         ▼ Logstash / Fluent Bit
OpenSearch Index (security-alerts-*)
         │
         ├──► Rule Engine (OpenSearch Alerting)
         │         │
         │         ▼ Alert document created
         │
         ├──► VectorLog-Engine k-NN
         │         │
         │         ▼ Semantic cluster analysis
         │
         ▼ ObservaBoard DZ SIEM Plugin
         Renders alert list + threat intel correlation
```

## Localization Architecture

```
src/plugins/dz_siem/
├── translations/
│   ├── ar-DZ.json     ← Arabic (Algerian) — RTL
│   └── fr-DZ.json     ← French (Algerian)
```

RTL layout uses CSS logical properties throughout, no RTL-specific overrides needed.
