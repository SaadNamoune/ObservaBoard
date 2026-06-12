# ObservaBoard

**SIEM & Observability Dashboard Platform for Algerian Enterprise** — A customized OpenSearch Dashboards distribution tailored for Security Information and Event Management (SIEM), infrastructure observability, and compliance reporting in the Algerian enterprise and government market.

[![Node.js 22](https://img.shields.io/badge/node-22-green)](https://nodejs.org/)
[![React 18](https://img.shields.io/badge/react-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![OpenSearch](https://img.shields.io/badge/OpenSearch-2.13-orange)](https://opensearch.org/)
[![License](https://img.shields.io/badge/license-Apache--2.0-orange)](LICENSE.txt)

> **Research & Commercial Development** — ESI Alger | ENGISOFT.NET SOC Platform

---

## Overview

ObservaBoard extends OpenSearch Dashboards with SIEM-grade capabilities and deep Algeria-specific features:

1. **Arabic/French Bilingual UI** — Full RTL Arabic interface + French for Algerian enterprise teams
2. **DZ SIEM Dashboards** — Pre-built dashboards for ANSSI-DZ compliance, CERT-DZ threat feeds integration
3. **VectorLog Integration** — Semantic log search via OpenSearch k-NN + [VectorLog-Engine](https://github.com/SaadNamoune/VectorLog-Engine)
4. **Regulatory Compliance** — Built-in report templates for Law 18-07 (Data Protection), MSP/ANSSI security requirements
5. **Local Threat Intelligence** — DZ-specific IOC feeds and threat actor profiles for Maghreb region

---

## Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                     ObservaBoard                              │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │   Browser (React 18 + EUI/OUI)                       │    │
│  │                                                      │    │
│  │  ┌──────────────┐  ┌───────────────┐  ┌──────────┐  │    │
│  │  │ SIEM Module  │  │ Observability │  │ Reports  │  │    │
│  │  │ (DZ Plugin)  │  │ (Metrics/APM) │  │ (Compl.) │  │    │
│  │  └──────────────┘  └───────────────┘  └──────────┘  │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │   Core OSD (Search, Visualizations, Saved    │   │    │
│  │  │   Objects, Plugin Framework)                  │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  └──────────────────────────────────────────────────────┘    │
│                           │ HTTP/WS                          │
│  ┌────────────────────────▼──────────────────────────────┐   │
│  │   ObservaBoard API (Hapi.js / Node.js)                │   │
│  └────────────────────────┬──────────────────────────────┘   │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐   │
│  │   OpenSearch 2.13 (k-NN, Security, ML)                │   │
│  │   ┌──────────┐ ┌──────────────┐ ┌──────────────────┐ │   │
│  │   │ Log Index│ │ VectorLog    │ │ Threat Intel     │ │   │
│  │   │ (ECS)    │ │ k-NN Index   │ │ (DZ IOC feeds)   │ │   │
│  │   └──────────┘ └──────────────┘ └──────────────────┘ │   │
│  └───────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

---

## DZ SIEM Modules

| Module | Description | Standard |
|---|---|---|
| `dz_siem` | Security event correlation + alert management | ANSSI-DZ |
| `dz_compliance` | Law 18-07 data protection audit reports | CRSSI |
| `dz_threat_intel` | Maghreb-region IOC feeds + CERT-DZ integration | MISP |
| `dz_network_monitor` | NSM for Algerian telecom operators (Algérie Télécom, Djezzy) | ARPT |
| `dz_log_search` | Semantic log search via VectorLog-Engine (k-NN + NLP) | — |

---

## Quick Start

```bash
yarn osd bootstrap
yarn start  # requires OpenSearch 2.13 on localhost:9200

# Run with DZ SIEM plugin
yarn start --plugins-dir=src/plugins/dz_siem
```

---

## Research Context

ObservaBoard is the visualization frontend for the ENGISOFT.NET SOC-as-a-Service platform targeting Algerian enterprises. Combined with [VectorLog-Engine](https://github.com/SaadNamoune/VectorLog-Engine) for semantic anomaly detection and [CyberSiege-Platform](https://github.com/SaadNamoune/CyberSiege-Platform) for security training, it forms a complete DZ cybersecurity ecosystem.

---

## Author

**Saad Namoune** — ESI Alger | ENGISOFT.NET SOC Platform  
[GitHub](https://github.com/SaadNamoune) | [Email](mailto:saad.namoune28@gmail.com)
