# PRD to Lovable Prompt Specification

## Goal

Turn a rough idea or PRD into a precise prompt that Lovable can use to generate a useful MVP frontend.

## Required Sections

The generated prompt should include:

- app name or placeholder name
- target user
- problem statement
- MVP goal
- main user journeys
- screens/pages
- navigation structure
- component expectations
- mock data expectations
- responsive/mobile behavior
- visual style guidance
- empty/loading/error states
- interactions and feedback
- integrations to represent as mocked flows
- constraints
- what not to build

## Prompt Style

The prompt should be direct and implementation-oriented.

It should not be vague marketing copy. It should tell Lovable what to build, which screens matter, what data to show and what interactions must exist.

## Handoff Message

Always include a short handoff note telling the user:

1. Paste the prompt into Lovable.
2. Generate or update the frontend.
3. Bring the generated code back.
4. Use `lovable-frontend-normalizer` for the next stage.

