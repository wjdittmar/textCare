# textCare
*Telemedicine system design prototype*

**Live Demo**: https://textcare.onrender.com/  
**Tech Stack**: Go • PostgreSQL • Next.js

## Development Setup

### Prerequisites
- Go 1.20+
- Node.js 18+
- PostgreSQL 15+
- Make (optional)

### Environment Variables

| Variable               | Description                                  | Example Value                          |
|------------------------|----------------------------------------------|----------------------------------------|
| `NEXT_PUBLIC_API_URL`  | API base URL (client-accessible)            | `http://localhost:4000`                |
| `DB_DSN`               | PostgreSQL connection string                | `postgres://user:pass@localhost:5432/textcare` |
| `CORS_ALLOWED_ORIGINS` | Allowed origins for CORS                    | `http://localhost:3000`                |

## Base Functional Requirements
- **As a user**, I can:
  - Select a doctor that practices in my state
  - Add medical conditions using autocomplete
- **As an admin**, I can:
  - Add additional providers

## Possible Additional Functional Requirements
- **As a user**, I can:
  - Pay for a subscription service
  - Receive text/email notifications
  - Receive medications that have been prescribed to me
  - See a record of care that I have received
  - Message with my provider on web and mobile
  - Schedule appointments
- **As a provider**, I can:
  - See current and past appointments
  - Provide my availability / schedule appointments
  - Message with patients
  - Prescribe medications to patients
  - Have pre-populated workflows for common clinical problems (UTI, PNA, etc)
- **As an admin**, I can:
  - See important business-level metrics (user retention, new signups, no-shows, provider efficiency)

## Non-Functional Requirements
- Data is secure and HIPAA compliant
- Minimal friction signup
- Scalable architecture
- Consistency > availability for medical data

## Backend To Do

- <s>Routing</s>
- <s>Logging</s>
- <s>Graceful shutdown</s>
- <s>Authentication/access control</s>
- <s>Patient/provider endpoints</s>
- Seed fake data
- ?Payments integration
- ?Prescriptions integration
- ?Scheduling
- ?APN/Firebase integration
- **Autocomplete API**:
  - <s>In-memory ICD-10 implementation</s>
  - Investigate Soundex algorithm
  - Evaluate SNOMED alternatives
  - Explore Elasticsearch integration
  - Expand to medication search

## Frontend To Do

- Match Figma design (in progress)
- Form validation (React Hook Form + Zod)
- Modular component architecture
- Automated testing
- Performance optimization

## Infra To Do

- DB backups/maintenance
- Alerting system
- Auto-scaling configuration
- Dockerization
- Microservices?

## ML To Do

- NLP symptom analysis
- LLM triage system
- Predictive no-show modeling
- Treatment recommendation engine

## Data To Do

- ETL pipeline for metrics
- Anonymized data exports
- Audit logging system
- Compliance reporting

---

*Project status: Active development - architecture subject to change*
