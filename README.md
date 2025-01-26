# textCare

Telemedicine system design problem. Work in progress.

Live site is at https://textcare.onrender.com/

Go / Postgres / Next.Js 

## Base Functional Requirements
- As a user, I can:
  - Select a doctor that practices in my state
  - Add medical conditions using autocomplete
- As an admin, I can
  - Add additional providers

## Possible Additional Functional Requirements
- As a user, I can:
  - Pay for a subscription service
  - Receive text/email notifications
  - Receive medications that have been prescribed to me
  - See a record of care that I have received
  - Message with my provider on web and mobile
  - Schedule appointments
- As a provider I can
  - See current and past appointments
  - Provide my availability / schedule appointments
  - Message with patients
  - Prescribe medications to patients
  - Have pre-populated workflows for common clinical problems (UTI, PNA, etc)
- As an admin I can
  - See important business-level metrics -- user retention, new signups, no-shows, provider efficiency, staffing changes, operational statistics

## Non-Functional Requirements
  - Data is secure and HIPAA compliant
  - Minimal friction signup 
  - Scalable architecture
  - Consistency > availability for medical data

## Backend To Do

- <s>Routing </s>
- <s>Logging </s>
- <s>Graceful shutdown </s>
- <s>Authentication / access control </s>
- <s>Patient / provider editing end points </s>
- Seed fake data
- ?Payments integration
- ?Prescriptions integration (photon health?)
- ?Scheduling
- ? APN / Firebase integration
- Autocomplete API 
    - <s> in-memory implementation using ICD 10 codes and Go "contains" function</s>
    - investigate use of Soundex algorithm rather than string matching
    - investigate alternatives to ICD 10 (SNOMED?) that would have patient-friendly names 
    - investigate use of elastic search for fuzzy matching
    - generalize search service to support autocomplete for medications as well
- Geospatial indexing ? (no, state-level matching for provider for a telemedicine platform should be enough)

## Frontend To Do

- Match Figma design (in progress)
- Form validation (React Hook Form + Zod?)
- Modular, well-organized, hierarchical code
- Automated testing
- Performance metrics

## Infra To Do

- DB backups / maintenance
- Alerts
- Auto-scale architecture
- Microservices?
- Dockerize?

## ML To Do

- NLP to infer chief complaint
- LLM to triage complaint

## Data To Do

- ETL pipeline to prepare business metrics
