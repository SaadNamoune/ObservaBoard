# Changelog — ObservaBoard

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- `dz_siem` plugin: compliance dashboard for Loi 18-07 / CRSSI with per-article scoring
- `dz_siem` plugin: VectorLog-Engine semantic search panel (k-NN cosine, 384-dim MiniLM)
- Server-side compliance and threat intelligence API routes
- Arabic (ar-DZ) and French (fr-DZ) i18n translation files
- MISP-DZ, CERT-DZ, and ANSSI-DZ threat feed integration
- ANPDP audit report generation endpoint
- Jest unit tests for ComplianceDashboard and ThreatIntelPanel components
- GitHub Actions CI pipeline with OpenSearch 2.13 integration test job

---

## [0.2.0] — 2024-12-01

### Added
- `dz_siem` OSD plugin scaffolding: manifest, plugin lifecycle (setup/start/stop)
- Bilingual SIEM dashboard: security events, critical alerts, ANSSI-DZ compliance score, monitored hosts
- ThreatIntelPanel component with IOC table (type, source, confidence, region)
- Server API: `GET /api/dz_siem/alerts` querying `security-alerts-*` OpenSearch index
- RTL layout support using CSS logical properties throughout the plugin

### Infrastructure
- Dockerfile for containerized ObservaBoard deployment
- Jenkins pipeline for on-premise CI/CD (Algerian data residency requirement)
- OSD config defaults (`opensearch_dashboards.yml`) for single-node setup

---

## [0.1.0] — 2024-10-15

### Added
- Initial fork from OpenSearch Dashboards 2.13.0
- Project renamed: **ObservaBoard** — SIEM/Observability platform for Algeria
- README rewrite with DZ SIEM module table, architecture diagram, and pilot deployment notes
- Apache-2.0 license confirmation (SSPL-free for commercial SaaS in Algeria)
- ARCHITECTURE.md: three-tier stack diagram, DZ plugin lifecycle, data flow
- RESEARCH_NOTES.md: competitive analysis vs Splunk/Elastic, DZ market sizing ($180M USD, +22%/yr)

---

## Roadmap

| Version | Target | Feature |
|---|---|---|
| 0.3.0 | Q1 2025 | `dz_compliance` plugin — full ANPDP audit report PDF export |
| 0.4.0 | Q1 2025 | `dz_threat_intel` plugin — live MISP-DZ event polling |
| 0.5.0 | Q2 2025 | Network anomaly detection via OpenSearch ML plugin (Isolation Forest) |
| 1.0.0 | Q3 2025 | Production SaaS release — Algeria multi-tenant deployment |
