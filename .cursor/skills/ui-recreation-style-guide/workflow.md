# UI Recreation Workflow

Use this workflow when recreating UI from a screenshot, mockup, or visual reference.

## 1. Understand The Target

Identify:

- UI type: page, panel, dialog, form, navigation, card, toolbar, ribbon, data grid, empty state, or feedback pattern
- Visible states: default, hover, active, focus, selected, disabled, loading, error, or success
- Layout: grouping, alignment, density, spacing rhythm, responsive behavior, and scroll regions
- Content hierarchy: headings, labels, helper text, actions, metadata, and icon usage
- Interaction expectations: click targets, keyboard flow, focus order, validation, disclosure, and motion

## 2. Locate Local Patterns

Search the style guide before implementing:

- `components/` for component examples and usage guidance
- `styles/components.css` for reusable classes and state styles
- `tokens/` for CSS custom properties
- `foundations/` for color, typography, spacing, shape, elevation, icons, alignment, and motion
- `guidelines/` for accessibility, heuristics, responsive design, UX principles, and Laws of UX

Use the closest existing component pattern. If multiple patterns could fit, choose the one whose documented usage matches the user's goal, not just the screenshot appearance.

## 3. Map Screenshot Details To The System

Translate visual details into style-guide concepts:

- Colors should map to `--color-*` tokens.
- Spacing should map to `--space-*` tokens or existing layout classes.
- Typography should map to the documented font family, text sizes, weights, and line heights.
- Corners should map to `--radius-*` tokens.
- Shadows and stacking should map to elevation tokens or existing component styles.
- Motion should map to duration and easing tokens, and respect reduced-motion behavior.
- Icons should follow existing icon patterns and include accessible names when needed.

Avoid pixel-perfect hard-coding when a token or component class exists.

## 4. Implement Conservatively

Implementation priority:

1. Reuse existing HTML patterns from `components/`.
2. Reuse classes from `styles/components.css`.
3. Compose with existing tokens from `tokens/`.
4. Add scoped styles only when the style guide lacks a reusable pattern.
5. Propose token or shared component changes only when the new behavior is reusable.

Keep changes close to the requested UI. Do not refactor unrelated components while recreating a screenshot.

## 5. Resolve Conflicts

When the screenshot and style guide disagree:

- Follow the style guide for colors, spacing, typography, shape, focus, motion, and accessibility.
- Mention the mismatch in the final response.
- Ask the user before changing shared tokens or global component rules for a screenshot-specific difference.

## 6. Validate Before Finishing

Check:

- Visual match to the screenshot at the intended viewport.
- Reuse of tokens and component classes.
- Semantic HTML and accessible labels.
- Keyboard access and focus visibility.
- Disabled, hover, active, selected, loading, and error states when relevant.
- Responsive behavior across expected breakpoints.
- Reduced-motion support for animations and transitions.

If the project has a build or preview command available, run the relevant verification only after the user has approved command execution.
