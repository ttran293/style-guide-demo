# UI Recreation QA Checklist

Use this checklist before reporting a screenshot recreation or style-guide UI task as complete.

## Visual Fidelity

- The major layout, grouping, hierarchy, and density match the reference.
- Component variants match documented usage, not only appearance.
- Spacing uses `--space-*` tokens or established layout classes.
- Colors use `--color-*` tokens.
- Typography follows the repository font family, size, weight, and line-height tokens.
- Radius, borders, shadows, and dividers follow existing shape and elevation rules.
- Icons match existing icon style and sizing.

## Component Behavior

- Required states are represented: default, hover, active, focus, selected, disabled, loading, error, or success.
- Interactive elements have clear target sizes and affordances.
- Buttons, links, inputs, dialogs, menus, tabs, grids, and forms follow existing component examples when available.
- New styles are scoped unless they are intentionally reusable.

## Accessibility

- HTML is semantic for the control or content type.
- Interactive elements are keyboard reachable.
- Focus states are visible and use documented focus patterns.
- Icon-only controls have accessible names.
- Form controls have labels, helper text, and error messaging where needed.
- Contrast follows the accessibility guidance in `guidelines/accessibility.html`.
- Motion respects `prefers-reduced-motion`.

## Responsive Layout

- The layout works at the target screenshot size.
- Content wraps, truncates, or scrolls intentionally.
- Controls remain usable on narrower viewports.
- Fixed dimensions are avoided unless required by the component pattern.

## Final Response

Mention:

- What was implemented.
- Any screenshot details that were adjusted to match the style guide.
- Any assumptions made about missing states, interactions, or responsive behavior.
- Any verification that was run, or why it was not run.
