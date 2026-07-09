# Mobile-First Checklist

Assume the main usage may be mobile unless the product clearly says otherwise.

Use Tailwind mobile-first:

- unprefixed classes define mobile
- `sm:`, `md:`, `lg:` and larger prefixes enhance wider screens
- default layout must work at 360px width

## Viewports

Validate these when possible:

- 360 x 740
- 375 x 812
- 390 x 844
- 414 x 896
- 430 x 932

## Rules

Check:

- no accidental horizontal scroll
- cards stack by default
- buttons have comfortable touch area
- bottom navigation does not overlap content
- main content has safe-area bottom padding when bottom nav exists
- forms remain usable on mobile
- modals and drawers fit mobile height
- charts degrade gracefully on small screens
- tables become cards or explicit overflow containers
- long labels wrap cleanly
- touch targets do not shift layout on hover or active states

## Tailwind Patterns

Prefer:

```txt
grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
flex flex-col sm:flex-row
overflow-x-auto
pb-[calc(env(safe-area-inset-bottom)+theme(spacing.20))]
min-h-dvh
```

Avoid desktop-first structures that require later overrides to become usable on mobile.

## Charts and Tables

Preserve existing chart libraries and visual intent.

When refactoring:

- move transformations out of JSX
- create typed view models
- preserve chart appearance unless asked to change
- provide empty states
- maintain mobile readability
- use explicit overflow containers for wide data

Do not remove charts because the data is mocked.

