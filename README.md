# daviandrade.dev

Personal site and living resume for Davi Andrade — public portfolio pages with an owner-only CMS backed by the shared auth hub.

Live site: [daviandrade.dev](https://daviandrade.dev)

---

## English

### What it does

- Public home with projects, contact, and a living resume
- Owner-only editing after sign-in through [auth.daviandrade.dev](https://auth.daviandrade.dev)
- Project media, bilingual PT/EN content, light/dark theme
- Resume content that can export to PDF
- SEO basics (robots, sitemap, icon)

### Architecture decisions

- **Auth hub SSO.** The site does not store passwords. The owner signs in on the hub and returns with a one-time token.
- **Document CMS in Postgres.** Portfolio content is a versioned document the owner edits; visitors only read the published view.
- **Owner gate by email.** `PORTFOLIO_OWNER_EMAIL` must match the hub account before write APIs open.
- **Local port 3200.** The auth hub uses 3100; this app uses 3200 so both can run together.
- **PDF is generated from live content.** The resume export reads the same document the page renders.

### Stack

Next.js 16, React 19, Tailwind CSS, Better Auth consumer, Postgres, Vitest, GitHub Actions.

### Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3200](http://localhost:3200).

### Useful scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server on 3200 |
| `pnpm test` | Unit tests |
| `pnpm lint` | ESLint |
| `pnpm check-types` | TypeScript |
| `pnpm build` | Production build |

CI runs lint, types, and tests on every push.

---

## Português

### O que faz

- Site público com projetos, contato e currículo vivo
- Edição só do dono após login no [auth.daviandrade.dev](https://auth.daviandrade.dev)
- Mídia de projetos, conteúdo PT/EN, tema claro/escuro
- Currículo exportável em PDF
- SEO básico (robots, sitemap, ícone)

### Decisões de arquitetura

- SSO pelo auth hub; sem senha local.
- CMS em documento no Postgres.
- Escrita liberada só para o e-mail dono.
- Porta local 3200 (auth usa 3100).
- PDF gerado a partir do mesmo conteúdo da página.

### Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abra [http://localhost:3200](http://localhost:3200).
