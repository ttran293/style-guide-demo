# Design Token Editing Workflow

Use this workflow when changing `tokens/*.css` or token-backed styles.

## 1. Classify The Change

Decide whether the request is:

- A token value change: updating an existing design decision
- A new token: introducing a reusable design decision
- A component style change: using existing tokens in a new way
- A one-off mockup need: scoped styling that should not become a token yet

Only add or change tokens when the design decision is shared across the system.

## 2. Inspect Current Token Usage

Before editing, inspect:

- The relevant file in `tokens/`
- `tokens/index.css`
- Consumers in `styles/components.css`
- Any related pages in `components/` or `foundations/`

For colors, check both `:root, [data-theme='light']` and `[data-theme='dark']` values.

## 3. Name Tokens Carefully

Use names that describe role and meaning:

- Good: `--color-control-border-active`
- Good: `--color-surface-2`
- Good: `--duration-normal`
- Avoid: `--color-blue-from-screenshot`
- Avoid: `--space-card-special`

If a value belongs to a single component, prefer a component-level custom property or scoped style unless the pattern is clearly reusable.

## 4. Edit Consumers

After changing or adding a token:

- Update component CSS to consume the token where appropriate.
- Avoid leaving duplicate raw values behind.
- Update foundation or component docs if the visible design rule changed.
- Keep token comments aligned with current usage.

## 5. Validate Impact

Check:

- Light and dark themes still work.
- Text and UI contrast remain accessible.
- Component states still have distinct visual treatment.
- Spacing and type scale changes do not break layout density.
- Motion changes still respect `prefers-reduced-motion`.
- Token names are stable enough for future component reuse.

Ask before broad token changes that alter many existing components.
