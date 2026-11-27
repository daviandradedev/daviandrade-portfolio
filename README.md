# daviandrade.dev

Personal portfolio, living resume, and public contact portal for Davi Andrade, backed by an owner-only Postgres CMS and shared SSO.

Live site: [daviandrade.dev](https://daviandrade.dev)

---

## English

### What it does

- Showcase of live software products (Riteflow, Seriesaholic, Work Schedule, Asebili, Auth Hub, `@daviandradedev/ui`), public-sector portals, and prototypes
- Curated Academic and Professional PDF resumes in English and Portuguese
- Interactive living resume with accessible timeline filters (Research, Experience, Volunteering)
- Dedicated `/contact` page and rate-limited contact API powered by Resend
- Owner-only inline editing after signing in via [auth.daviandrade.dev](https://auth.daviandrade.dev)
- Keyboard command palette (`Cmd+K` / `Ctrl+K`), bilingual PT/EN copy, light/dark themes, and WCAG 2.2 AA accessibility

### Key design choices

- **Shared auth hub:** No local passwords; authentication runs through `auth.daviandrade.dev`.
- **Owner-gated Postgres CMS:** Content is stored as a validated versioned JSON document editable only by `PORTFOLIO_OWNER_EMAIL`, with typed seed fallback.
- **Curated PDF resumes:** Static academic and professional PDFs live in `public/resume/` and are verified against the catalog in tests.
- **Local port 3200:** Runs alongside the auth hub (port 3100) without port collisions.

### Stack

Next.js 16 · React 19 · TypeScript · PostgreSQL (`pg`) · Better Auth consumer · Resend · `cmdk` · `vaul` · `sonner` · Vitest · `axe-core`

### Run locally

```bash
git clone https://github.com/daviandradedev/daviandrade-portfolio.git
cd daviandrade-portfolio
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3200](http://localhost:3200).

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start dev server on port 3200 |
| `pnpm test` | Run unit, contact, catalog, i18n, and `axe-core` tests |
| `pnpm lint` | Run ESLint with strict `jsx-a11y` (`--max-warnings 0`) |
| `pnpm check-types` | Run TypeScript strict check |
| `pnpm build` | Production build |

---

## Português

### O que faz

- Vitrine de produtos no ar (Riteflow, Seriesaholic, Work Schedule, Asebili, Auth Hub, `@daviandradedev/ui`), projetos no setor público e protótipos
- Currículos Acadêmico e Profissional em PDF (PT-BR e EN) prontos para download
- Currículo vivo interativo com filtros acessíveis (Pesquisa, Experiência, Voluntariado)
- Página dedicada `/contact` e API de contato com proteção contra abuso (rate limit) via Resend
- Edição restrita ao dono após login em [auth.daviandrade.dev](https://auth.daviandrade.dev)
- Menu de comandos (`Cmd+K` / `Ctrl+K`), conteúdo bilíngue PT/EN, tema claro/escuro e acessibilidade WCAG 2.2 AA

### Principais decisões

- **Auth hub compartilhado:** Sem senhas locais; toda autenticação passa por `auth.daviandrade.dev`.
- **CMS no Postgres restrito ao dono:** O conteúdo fica em um documento JSON validado e versionado, editável apenas por `PORTFOLIO_OWNER_EMAIL`, com fallback para o seed tipado.
- **Currículos PDF curados:** PDFs acadêmicos e profissionais ficam em `public/resume/` e são conferidos por testes automatizados.
- **Porta local 3200:** Roda em paralelo com o auth hub (porta 3100) sem conflito.

### Stack

Next.js 16 · React 19 · TypeScript · PostgreSQL (`pg`) · Better Auth · Resend · `cmdk` · `vaul` · `sonner` · Vitest · `axe-core`

### Rodar localmente

```bash
git clone https://github.com/daviandradedev/daviandrade-portfolio.git
cd daviandrade-portfolio
pnpm install
cp .env.example .env.local
pnpm dev
```

Abra [http://localhost:3200](http://localhost:3200).

### Scripts

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Sobe o servidor local na porta 3200 |
| `pnpm test` | Roda testes unitários, contato, catálogo, i18n e `axe-core` |
| `pnpm lint` | Roda ESLint com `jsx-a11y` estrito (`--max-warnings 0`) |
| `pnpm check-types` | Verifica tipos TypeScript |
| `pnpm build` | Gera o build de produção |
