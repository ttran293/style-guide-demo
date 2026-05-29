# Component Page QA Checklist

Use this checklist before finishing a component page change.

## Documentation

- The lead paragraph explains the component's purpose.
- Usage guidance is specific and practical.
- Variants and states are named consistently.
- "When to use" and "When not to use" guidance is included when useful.
- Related components are linked or mentioned when users might confuse them.

## Examples

- Examples use existing classes and tokens.
- Examples cover the most important variants.
- Relevant states are shown: hover, focus, selected, disabled, loading, error, or empty.
- Labels and sample content are realistic.
- Demo-only wrappers are clearly separate from reusable component classes.

## Accessibility

- Interactive examples use semantic controls where possible.
- Icon-only controls include accessible names.
- Form controls have labels.
- Focus-visible behavior is present.
- Disabled controls use real disabled behavior when appropriate.
- Guidance mentions keyboard behavior for complex controls.

## System Fit

- New CSS is shared only when reusable.
- Token usage is preferred over raw visual values.
- The page follows nearby `components/` structure.
- The change does not contradict `foundations/` or `guidelines/`.
