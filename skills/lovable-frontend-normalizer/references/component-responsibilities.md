# Component Responsibilities

## Pages

Feature pages compose the screen.

Pages may:

- call feature hooks
- receive view models
- arrange sections
- render loading, error and empty states
- pass data and callbacks to feature components

Pages must not:

- import mocks directly
- call APIs directly
- contain complex business calculations
- define many nested components
- become giant JSX trees

## Feature Components

Feature components render product-specific UI.

They may:

- render cards, lists, forms, charts, dialogs and feature sections
- receive typed props
- use small local UI state for visual-only behavior

They must not:

- import mocks directly
- call APIs directly
- know backend implementation details
- own cross-feature business rules
- manipulate global state unless intentionally designed as connected components

## Shared Components

Shared components provide reusable, domain-neutral UI.

They may:

- render generic layout primitives
- receive props and children
- wrap design-system primitives
- provide app-wide visual consistency

They must not:

- depend on feature modules
- depend on mocks
- contain product-specific business logic
- call services directly
- assume a specific business domain

## Hooks

Hooks orchestrate state, derived data and side effects.

Hooks may:

- read stores
- call services
- derive view models
- expose callbacks
- coordinate loading and error states
- encapsulate interactions

Hooks must not:

- return JSX
- contain Tailwind classes
- render UI
- define visual layout
- import component files

Use names such as:

```txt
useFeatureData
useFeatureFilters
useFeatureForm
useFeatureActions
useFeatureViewModel
```

Do not name a function `useSomething` if it does not use React hooks.

## Services

Services are the data boundary.

Services may:

- call APIs
- switch between mock and real implementations
- map DTOs to frontend view data
- normalize errors
- define request and response typing

Services must not:

- render JSX
- contain Tailwind classes
- decide visual toast content in UI terms
- manipulate the DOM
- own layout behavior

## Shell and Layout

Split large shell files when they mix navigation, headers, mobile nav, reset buttons, demo state sync, feature actions and route rendering.

Useful split when needed:

```txt
shared/components/AppShell.tsx
shared/components/AppSidebar.tsx
shared/components/MobileBottomNav.tsx
shared/components/PageHeader.tsx
shared/components/AppTopActions.tsx
shared/components/DemoResetButton.tsx
```

Do not create files that the current project does not need.

## Splitting Rules

Split a file when it:

- exceeds roughly 250 lines
- defines more than 3 meaningful components
- mixes route, data, UI and business logic
- imports mocks, stores, services, many icons and many UI components together
- repeats card/list/chart patterns
- contains business calculations inside JSX
- mixes shell, navigation, header actions and domain actions

Do not split when extraction creates meaningless wrappers or makes short clear code harder to follow.

