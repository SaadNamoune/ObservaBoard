# Research Notes — ObservaBoard

## Product Vision

ObservaBoard is the SIEM/Observability frontend for ENGISOFT.NET's SOC-as-a-Service platform targeting:
- **Algerian enterprises** (banks, telcos, industrial) requiring local data residency
- **Government agencies** needing ANSSI-DZ and Law 18-07 compliance dashboards
- **ISPs** (Algérie Télécom, Djezzy) monitoring network security events

## Competitive Analysis

| Feature | Splunk Enterprise | Elastic SIEM | ObservaBoard |
|---|---|---|---|
| Arabic RTL UI | No | No | Yes |
| ANSSI-DZ compliance templates | No | No | Yes |
| CERT-DZ threat feed integration | No | No | Yes |
| Law 18-07 audit reports | No | No | Yes |
| On-premise DZ hosting | Expensive | Complex | Native |
| Pricing | $150K+/yr | $50K+/yr | SaaS DZD |

## Technical Architecture Decisions

### OpenSearch over Elasticsearch
- Apache-2.0 license (no SSPL concerns for commercial SaaS)
- k-NN plugin included natively (critical for VectorLog semantic search)
- FOSS-friendly Algeria government procurement

### Plugin-Based Customization
- OSD plugin system isolates DZ-specific features cleanly
- Easy to maintain as upstream OSD evolves
- DZ plugins: `dz_siem`, `dz_compliance`, `dz_threat_intel`, `dz_log_search`

### Bilingual RTL Architecture
- CSS logical properties (`margin-inline-start`) work for both LTR/RTL
- i18n keys: `dz_siem.dashboard.title` → `ar-DZ` / `fr-DZ` translations
- Arabic date formatting: Hijri calendar option for government use

## DZ Compliance Framework Mapping

| Regulation | DZ Law/Standard | ObservaBoard Feature |
|---|---|---|
| Data Protection | Loi 18-07 | PDPA audit dashboard |
| Critical Infrastructure | CRSSI framework | ICS/OT monitoring panel |
| Telecom Security | ARPT cybersecurity requirements | Network anomaly detection |
| Banking | CPA/BNA security requirements | Financial fraud detection |

## Market Opportunity

- Algeria cybersecurity market: ~$180M USD (2024), growing 22%/yr
- Only 3 local SIEM providers (none with Arabic UI + full feature set)
- Government procurement: Algerian agencies required to prefer local solutions per Décret exécutif 17-98
