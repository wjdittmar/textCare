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

<<<<<<< Updated upstream
#### provider selection step
- <s>move doctor selection step layout to a parent component onboarding so we can share the layout with the medical condition step</s>
- persist PCP selection to DB
- geospatial searching for providers

#### conditions step
- <s> backend API for ICD10 autocomplete </s> -- ICD10 codes may not be the best choice here, need to find a dataset that has more patient-friendly terms and less specificity  (e.g. probably not important at this stage to have patient differentiate between 10 different types of migraine)
- <s>frontend component for autocomplete </s>
- <s>multiselect component for conditions step </s>
- removable components for confirm conditions step
=======
## Backend To Do

- <s>Routing </s>
- <s>Logging </s>
- <s>Graceful shutdown </s>
- <s>Authentication / access control </s>
- <s>Patient / provider editing end points </s>
- Seed fake data
- ?Payments integration
- ?Prescriptions integration
- ?Scheduling
- ? APN / Firebase integration
- Autocomplete API -- investigate alternatives to ICD 10
- Geospatial indexing ? (no, state-level matching for provider for a telemedicine platform should be enough)

## Frontend To Do

- Match Figma design (in progress)
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
>>>>>>> Stashed changes
