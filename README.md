# textCare

Implement the system design problem presented by CurAI. Still a work in progress.

Live site is at https://textcare.onrender.com/

## Backend Notes
- graceful shutdown
- logging
- token authentication middleware with configurable user permissions
- serve static frontend

## Frontend Notes
- React / Next.js

### TODO

#### common
- user login / use appropriate token for submitting requests

#### provider selection step
- <s>move doctor selection step layout to a parent component onboarding so we can share the layout with the medical condition step</s>
- persist PCP selection to DB

#### conditions step
- backend API for ICD10 autocomplete
- frontend component for autocomplete 
- multiselect component for conditions step
- removable components for confirm conditions step
