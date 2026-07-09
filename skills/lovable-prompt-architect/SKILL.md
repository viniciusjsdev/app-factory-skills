---
name: lovable-prompt-architect
description: Use this skill when the user has an idea for an app, site, dashboard, SaaS, landing page, internal tool, MVP or prototype and wants a complete, structured prompt to paste into Lovable. The skill must transform rough product ideas into detailed Lovable prompts with product context, scope, UX, screens, routes, mock data, interactions, responsive behavior and first-delivery priorities. Do not use this skill to write application code or refactor existing code.
---

# Lovable Prompt Architect

## Purpose

Transform a rough product idea into a complete Lovable prompt.

The output must be a ready-to-paste prompt that guides Lovable to create a high-quality frontend prototype.

This skill is used before development starts in Lovable. It must produce prompts that are detailed, structured, product-aware, visually guided, mock-first, frontend-focused, commercially presentable, prepared for future backend integration and prepared for later code normalization.

## Core Principle

The user may provide only a rough idea. Turn that idea into a complete product prompt.

Do not return a generic brainstorm. Do not return only an outline. Do not ask many questions unless the idea is impossible to interpret.

Make reasonable assumptions and state them briefly before the final prompt.

## Input Expected

The user may provide:

- product idea
- target audience
- business domain
- pain points
- desired screens
- desired style
- examples
- stack preference
- MVP constraints
- backend expectation
- data model expectation
- presentation goal

The input may be incomplete. Complete it with strong assumptions.

## Load References

Read the relevant references before generating the prompt:

- `references/prompt-framework.md` for required prompt layers.
- `references/lovable-mvp-rules.md` for frontend-first MVP boundaries.
- `references/screen-spec-template.md` before writing screen specs.
- `references/mock-data-template.md` before defining data.
- `references/style-guide-template.md` before writing visual guidance.
- `references/interaction-checklist.md` before listing actions and feedback.
- `references/quality-rubric.md` before finalizing.

Use `assets/lovable-prompt-template.md` as the structural template when helpful.

## Output Expected

Always return:

1. `Premissas assumidas`
2. `Prompt para Lovable`
3. `Como usar`
4. `Proximos prompts incrementais`, only when useful

The `Prompt para Lovable` must be the main artifact and must be ready to copy and paste.

## Default MVP Stack

Unless the user says otherwise, instruct Lovable to use:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router or the routing approach currently used by Lovable
- lucide-react
- localStorage for mock persistence
- mock services
- mocked data
- no real backend in the first prototype

If the user specifically asks for the newer Lovable/TanStack stack, allow:

- React
- TypeScript
- Vite
- TanStack Router/Start
- Tailwind CSS
- shadcn/ui style components
- Zustand when state sharing is needed

Do not force Supabase, authentication, APIs, OpenAI, OCR, payments or database unless the user explicitly asks for real integration.

## Default MVP Restrictions

For first prototype prompts, include negative scope when appropriate:

- Do not implement real backend.
- Do not implement real authentication.
- Do not implement real payment.
- Do not implement real external API.
- Do not implement real file processing.
- Do not implement real OCR.
- Do not implement real AI inference.
- Do not implement Supabase unless requested.
- Simulate all backend behavior in frontend.
- Use localStorage and mock services.
- Prepare service boundaries for future integration.

Adapt this list to the project.

## Prompt Structure

The Lovable prompt must follow this structure:

```txt
Crie uma aplicacao chamada "[NOME DO PRODUTO]".

[Abertura com descricao objetiva do produto.]

O objetivo e criar um prototipo visual funcional, navegavel e convincente para [publico-alvo/contexto de apresentacao].

Nao implemente backend real.
Nao implemente integracoes reais.
Tudo deve ser simulado no frontend com dados mockados, localStorage e services preparados para futura integracao.

---

# CONTEXTO DO PRODUTO

[Explicar dominio, usuario, problema, fluxo principal e resultado esperado.]

---

# USUARIOS E DORES

[Descrever usuarios principais e dores.]

---

# OBJETIVO DO MVP

[Descrever o que o MVP precisa demonstrar.]

---

# STACK DO MVP

[React, TypeScript, Tailwind, shadcn/ui etc.]

---

# IDENTIDADE VISUAL E STYLE GUIDE

[Tom visual, paleta, tipografia, componentes, layout, linguagem.]

---

# EXPERIENCIA GERAL

[Regras de UX, apresentacao, feedbacks, navegacao, sensacao de produto real.]

---

# ROTAS

[Listar rotas.]

---

# LAYOUT PRINCIPAL

[Descrever layout autenticado ou publico, sidebar, header, bottom nav, mobile.]

---

# TELAS

[Detalhar cada tela.]

---

# DADOS MOCKADOS

[Definir dados iniciais.]

---

# SERVICES MOCKADOS

[Definir services, funcoes e tipos quando util.]

---

# INTERACOES IMPORTANTES

[Listar interacoes obrigatorias.]

---

# RESPONSIVIDADE

[Desktop, notebook, tablet, mobile.]

---

# QUALIDADE ESPERADA

[Criterios de qualidade.]

---

# PRIMEIRA ENTREGA

[Prioridade de construcao.]
```

## Prompt Depth Rules

For each important screen, include:

- route
- goal
- layout
- components
- fields
- states
- actions
- feedback
- empty state
- loading state
- mock data
- navigation behavior
- mobile behavior

For each important flow, include:

- starting point
- steps
- validations
- success behavior
- error behavior
- persistence behavior
- destination route

For each important service, include:

- function name
- what it receives
- delay/loading simulation
- return shape
- where it persists
- how UI consumes it

## Visual Guidance Rules

The prompt must avoid generic visual direction.

Bad:

```txt
Faca uma interface moderna e bonita.
```

Good:

```txt
Crie uma interface premium, sobria e institucional, com fundo escuro, cards discretos, bordas sutis, tipografia com boa hierarquia, botoes primarios destacados e uso moderado de animacoes.
```

Always define visual tone, color palette, typography, component style, icon style, spacing, border radius, card behavior, button behavior, loading/skeleton style, empty states and mobile behavior.

If the user provides a brand/site reference, include it as inspiration without copying blindly.

## UX Preservation for Future Normalization

The prompt must instruct Lovable to create rich UI/UX.

Do not ask Lovable to keep things minimal unless the product requires it.

Include loading states, toasts, modals, confirmations, disabled states, hover states, empty states, mock persistence, realistic data, responsive behavior and visual feedback for every primary action.

The generated code will later be normalized by `lovable-frontend-normalizer`, so the first prototype should prioritize product completeness and visual quality.

## Architecture Guidance for Lovable

Ask for:

- clean component organization
- reusable components
- mock services separated from UI
- localStorage helpers
- types/interfaces
- constants for mock data
- no hardcoded business logic directly inside large JSX when avoidable
- routes separated by pages
- components separated by responsibility

Do not overconstrain Lovable with a complex architecture that prevents it from building quickly.

## Domain Modeling Rules

If the project has domain objects, define them.

Examples:

- User
- Customer
- Transaction
- Analysis
- Report
- Task
- Project
- Document
- Message
- Appointment
- Order
- Product
- Notification
- Goal

For each domain object, include useful fields. When helpful, include TypeScript type examples.

## Mock Data Rules

Always ask for realistic mock data.

Minimum:

- dashboard data
- list/table data
- detail page data
- current user
- notifications or recent activity when useful
- at least 5 records for history/list screens
- varied statuses
- edge cases such as critical, pending, completed, empty

Avoid placeholder names like "Teste 1" or "Lorem ipsum".

## Interaction Rules

Every primary button must do something.

If real action is not available, simulate it with localStorage, state update, toast, modal, navigation, loading delay, generated mock result or confirmation dialog.

Never allow main actions to be dead buttons.

## Responsiveness Rules

Always include desktop, notebook, tablet and mobile behavior.

For mobile:

- sidebar becomes drawer or bottom navigation
- cards stack vertically
- forms are comfortable
- tables become cards or controlled horizontal scroll
- upload/drop zones stack
- charts remain readable
- no horizontal page scroll
- touch targets are comfortable

## First Delivery Rules

The prompt must tell Lovable what to build first.

Prioritize:

1. Core layout
2. Main navigation
3. Most important screen
4. Main user flow
5. Detail/report/result screen
6. History/list screen
7. Secondary screens

The most important screen must be explicitly identified.

## Style of Final Output

When generating the final Lovable prompt:

- Write in Portuguese unless the user asks otherwise.
- Use clear headings.
- Use imperative instructions.
- Be specific.
- Avoid vague words.
- Avoid emojis unless the product asks for them.
- Avoid unsupported backend promises.
- Avoid saying "implemente IA real" unless the user explicitly asks.
- Make the prompt copy-paste ready.

## Handling Missing Information

If missing:

- product name: create a temporary name and mark it as assumed
- target user: infer from idea
- visual style: choose one consistent with domain
- routes: propose routes
- mock data: create realistic data
- stack: use default MVP stack
- backend: assume no real backend for first prototype
- mobile: assume must be responsive

Ask a question only when the project idea is too ambiguous to define the product category.

## Quality Checklist

Before returning the prompt, verify that it includes:

- product name
- product objective
- target audience
- problem/pain
- MVP scope
- negative scope
- stack
- style guide
- routes
- layout
- screens
- main flow
- mock data
- mock services
- interactions
- localStorage/persistence
- responsiveness
- quality expectations
- first delivery priorities
- most important screen highlighted

## Do Not

- Do not generate React code.
- Do not create application files.
- Do not call APIs.
- Do not tell the user to "describe better" unless strictly necessary.
- Do not produce a short prompt.
- Do not remove complexity that is important for presentation.
- Do not make the MVP look generic.
- Do not forget the negative scope.
- Do not forget mock data.
- Do not forget services prepared for future integration.

