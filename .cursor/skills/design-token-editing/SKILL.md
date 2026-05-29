---
name: design-token-editing
description: Edit design tokens in this repository's CSS token system. Use when changing tokens/, CSS custom properties, colors, spacing, typography, shape, elevation, motion, light or dark theme values, or token-backed component styling.
---

# Design Token Editing

## Source Of Truth

Design tokens live in `tokens/` and are imported by `tokens/index.css`. Shared component styles should consume tokens instead of hard-coded visual values.

Use:

- `tokens/colors.css` for theme and semantic color values
- `tokens/spacing.css` for spacing scale
- `tokens/typography.css` for font, size, weight, and line-height values
- `tokens/shape.css` for radius and border values
- `tokens/elevation.css` for shadows and layering
- `tokens/motion.css` for duration, easing, transitions, and reduced-motion behavior
- `styles/components.css` for token consumers

## Required Workflow

1. Identify whether the requested change is a reusable design decision or a one-off component need.
2. Inspect the relevant token file and current consumers before editing.
3. Preserve semantic token naming and light/dark theme relationships.
4. Update component styles or documentation only when they should consume the changed token.
5. Validate that the change does not create inconsistent states, inaccessible contrast, or undocumented behavior.

## Token Rules

- Prefer semantic names over screenshot-specific names.
- Do not add a token for a single local exception unless it is expected to become reusable.
- Keep token values centralized in `tokens/`; avoid duplicating raw values in component CSS.
- Check both light and dark theme values for color changes.
- Preserve `prefers-reduced-motion` behavior when editing motion tokens.

## More Detail

- For the editing workflow, read `workflow.md`.
- For final QA, read `checklist.md`.
