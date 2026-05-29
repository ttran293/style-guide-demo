# Style Guide Audit Checklist

Use this checklist during style-guide reviews.

## Tokens

- Visual values use tokens where available.
- Token names are semantic and consistent.
- Light and dark theme values are both considered.
- Color contrast remains accessible.
- Motion tokens respect reduced-motion behavior.
- Token comments match current usage.

## Components

- Components use shared classes from `styles/components.css`.
- Variants and states are documented and demonstrated.
- Examples use semantic HTML.
- Focus-visible behavior is present for interactive controls.
- Disabled and loading states are represented where relevant.
- New component styles are reusable or clearly scoped.

## Foundations

- Foundation pages agree with token values.
- Typography, spacing, color, shape, elevation, icon, alignment, and motion guidance are consistent.
- Guidance avoids duplicating conflicting rules across pages.

## Guidelines

- Accessibility guidance is reflected in component examples.
- Responsive guidance is reflected in mockups and component layouts.
- UX principles are actionable, not generic filler.
- Heuristics and Laws of UX support implementation decisions without contradicting components.

## Mockups

- Mockups use the design system instead of becoming separate visual systems.
- Screenshot-specific details do not leak into global tokens without a reusable reason.
- Mockups document assumptions when behavior or states are not visible.

## Reporting

- Findings are ordered by severity.
- Each finding has a specific file reference.
- Suggested fixes are concrete and scoped.
- Optional polish is separated from defects.
