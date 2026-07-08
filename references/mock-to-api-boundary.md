# Mock to API Boundary

## Goal

Mocks are valid for MVPs, demos and Lovable-generated experiences. Isolate them so the UI can later move to a real backend without rewriting screens.

The UI must not import mock data or mock services directly.

Correct flow:

```txt
Route -> Feature Page -> Hook -> Service -> Mock or API
```

Wrong flow:

```txt
Route -> Mock
Component -> Mock
Chart -> Mock
Form -> Fake persistence directly
```

## Mock Location

Prefer:

```txt
src/mocks/
  data/
  services/
  factories/
```

For very small projects, feature-local mock folders are acceptable when clearly named and still hidden behind services.

## Service Facade

Use an environment-controlled facade when possible:

```ts
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

export const someService = USE_MOCKS ? mockSomeService : apiSomeService;
```

Default to mock mode for early MVPs unless the project already has real backend configuration.

## Service Responsibilities

Services may:

- call a real API
- call a mock implementation
- map DTOs into frontend view data
- normalize errors
- define request and response types
- hide backend or mock implementation details from UI

Services must not:

- render JSX
- contain Tailwind classes
- decide visual layout
- manipulate DOM
- import UI components

## Forms

Use React Hook Form and Zod for non-trivial forms when available.

Rules:

- validation schemas live in `features/<feature>/schemas`
- submit logic goes through a hook or service
- UI form components receive typed handlers and values
- loading, success and error feedback are visible
- existing visual form layout is preserved
- working forms are not rewritten unless needed

## Feedback

Every user action should have visible feedback.

Use existing project conventions first. If Sonner is already used, keep using Sonner.

Actions should include, when applicable:

- loading state
- disabled state during async work
- success feedback
- error feedback
- empty state
- confirmation for destructive actions

Do not silently trigger actions.

## API Documentation

When preparing backend boundaries, document per feature when useful:

- data needed by the screen
- current mock source
- future endpoint
- request shape
- response shape
- loading behavior
- error behavior
- relevant frontend DTOs

Do not couple components to backend models. Use frontend DTOs and mapping services.

