---
name: ui-recreation-style-guide
description: Recreate UI elements from screenshots, mockups, visual references, or UX/UI style-guide requirements using this repository's code-built design system. Use when the user asks to recreate, match, clone, implement, or refine UI from screenshots or visual examples.
---

# UI Recreation Style Guide

## Source Of Truth

Use this repository's code-built style guide as the source of truth:

- `tokens/` for colors, spacing, typography, shape, elevation, and motion
- `styles/components.css` for reusable component classes and states
- `components/` for live component examples and usage rules
- `foundations/` for foundational visual rules
- `guidelines/` for UX, accessibility, and responsive guidance

Screenshots and mockups are visual evidence, not the final authority. If a screenshot conflicts with the style guide, follow the style guide and report the mismatch.

## Required Workflow

1. Inspect the visual reference and identify elements, layout, hierarchy, spacing, states, interactions, and density.
2. Find matching local patterns in `components/`, `foundations/`, `guidelines/`, `tokens/`, and `styles/components.css`.
3. Implement with existing tokens and component classes first. Add new styles only when the guide has no matching pattern.
4. Preserve semantic HTML, keyboard access, focus visibility, reduced-motion behavior, and responsive layout.
5. Validate the result against the visual reference and the style guide before reporting completion.

## Implementation Rules

- Prefer CSS custom properties over hard-coded visual values.
- Reuse existing class naming and component structure where possible.
- Keep one-off screenshot details out of shared tokens unless they represent a reusable design decision.
- Do not copy inaccessible screenshot behavior; make the implementation accessible.
- Treat unknown visual details as assumptions and state them clearly.

## More Detail

- For the full process, read `workflow.md`.
- For final QA, read `checklist.md`.
