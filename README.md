<div align="center">
  <h1>churchinsydney.org</h1>
  <p>💠 Build with Next.js, Directus.io, TS, GraphQL, Tailwind CSS.</p>
</div>

[![Build and Deploy to Vercel](https://github.com/churchinsydney/churchinsydney.org/actions/workflows/vercel.yml/badge.svg)](https://github.com/churchinsydney/churchinsydney.org/actions/workflows/vercel.yml)

[![churchinsydney.org](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/413bgh&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/413bgh/runs)

![CI workflow](https://github.com/churchinsydney/churchinsydney.org/actions/workflows/unit-tests.yml/badge.svg)

# Tech stack

## Frontend
- Nextjs
- Typescript
- Tailwind CSS
- Flowbite UI components

## CMS
- Directus Headless CMS
- graphql

## CI/CD
- Github Actions
  - CI
    - Unit and DOM test
    - Build the site
    - Deploy to vercel
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
  - cms.churchinsydney.org S3 redirect
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
