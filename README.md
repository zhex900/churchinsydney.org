<div align="center">
  <h1>churchinsydney.org</h1>
  <p>💠 Build with Next.js, TS, GraphQL, Tailwind CSS.</p>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/5aca700e-e8ab-4e5d-b435-9214cb3fe8a0/deploy-status)](https://app.netlify.com/sites/churchinsydney/deploys)

[![churchinsydney.org](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/413bgh/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/413bgh/runs)

![CI workflow](https://github.com/churchinsydney/churchinsydney.org/actions/workflows/unit-tests.yml/badge.svg)

# Tech stack

## Frontend
- Nextjs
- Typescript
- Tailwind CSS
- flowbite UI components

## CMS
- Directus Headless CMS
- graphql

## CI/CD
- Github Actions
  - CI
    - Unit and DOM test
    - Build the site
    - Deploy PR, and push to master as preview to vercel
    - Show preview URL in PR comments
    - After preview deployment run Cypress
    - Show Cypress result in PR comments
  - CD
    - Production deploy on release
    - No need to run cypress
## Hosting
- Vercel

## Infrastructure
- AWS CDK
  - cms.churchinsydnye.org S3 redirect
  - www.churchinsydney.ort DNS redirect
- Sendgrid (contact us emailer)

## Testing
- Cypress (E2E)
- msw (mocking network requests)
- Vitest (Test runner)
- React testing library (DOM testing)

# Development

Setup environment variables in `.env.local` file:

Update the values in .env.local

First, run the development server:

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
