# IP Code Exchange — Commercialization Engine 4.2.0

A deployable AI-assisted workflow for turning software and other technical IP into commercial opportunities.

## Product

IP Code Exchange is designed to take an existing piece of intellectual property and produce a commercialization brief rather than asking the user to become a business analyst first.

Current workflow:

IP asset -> analysis -> screening valuation -> licensing paths -> buyer categories -> first-contact outreach

The product is intended to evolve toward multiple asset-ingestion paths, including direct descriptions, pasted material, repository analysis, and ZIP-based project ingestion.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide an OpenAI key for live AI analysis.

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Without an OpenAI key, the application can use its deterministic screening fallback so the product remains demonstrable. With a key, the commercialization endpoint uses the configured OpenAI model.

## Deploy

This repository is Next.js/Vercel-ready. Import the repository into Vercel and configure runtime secrets through Vercel Environment Variables.

Do not commit API keys, Supabase service-role credentials, private datasets, customer data, or other secrets to this repository.

## Public repository / IP boundary

This repository is public so the product can be demonstrated, inspected, and shared.

Public visibility does not grant commercial reuse rights. The project is distributed under the proprietary license in `LICENSE`.

The repository should contain only material intentionally released as part of the public product. Proprietary ArgOS architecture, private research, internal prompts, private datasets, credentials, and other confidential intellectual property should remain outside this public repository.

Existing third-party dependencies remain subject to their own licenses.

## Product limitations

The current 4.2.0 ship intentionally keeps the product surface small: one asset enters and a commercialization brief comes out. Buyer discovery is a lead-generation aid and requires human verification. Valuation is a screening estimate, not a formal appraisal. Generated licensing or outreach material is not legal advice.

## Status

Version: 4.2.0

Deployment target: Vercel / Next.js

Commercialization engine: SHIPPED

Further ingestion, repository analysis, ZIP ingestion, authentication, persistence, and commercialization workflow hardening can evolve without changing the core product promise.

## QA checkpoint

The current ship includes contextual explanations for key commercialization metrics and result sections. The production verification pass should confirm the live deployment is built from the latest main-branch commit before treating this UX checkpoint as live.
