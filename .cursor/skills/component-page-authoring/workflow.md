# Component Page Workflow

Use this workflow when creating or updating a file in `components/`.

## 1. Study Nearby Pages

Before editing, inspect similar component pages and shared styles:

- `components/button.html`
- `components/forms.html`
- `components/card.html`
- `components/dialog.html`
- `components/dropdown.html`
- `styles/components.css`
- `styles/guide.css`

Follow the local page structure and class patterns instead of inventing a new documentation format.

## 2. Define The Component Contract

Identify:

- Purpose: what problem the component solves
- Variants: visual or behavioral alternatives
- States: default, hover, focus, active, selected, disabled, loading, error, success
- Content rules: labels, icons, helper text, empty states, and truncation
- Interaction rules: keyboard behavior, focus order, disclosure, validation, or dismissal
- Related components: when another component should be used instead

## 3. Write The Page

Prefer this structure when it fits:

1. `h1` title and `sg-lead` summary
2. Variant or usage table
3. Preview examples in `sg-preview`
4. "When to use"
5. "When not to use"
6. State examples
7. Accessibility notes
8. Related patterns

Use concise, product-oriented examples. Button labels, form labels, and sample content should feel realistic.

## 4. Implement Examples

Use existing classes from `styles/components.css` first. Use CSS custom properties from `tokens/` for visual values.

Only add new CSS when:

- The component needs reusable behavior that does not already exist.
- The class belongs in the shared component system.
- The class name follows the existing naming style.

Keep demo-only layout helpers in the documentation layer when they are not part of the reusable component.

## 5. Validate

Check that the page:

- Loads through the existing style-guide shell.
- Uses semantic HTML.
- Includes important states.
- Has keyboard-visible focus for interactive controls.
- Uses tokens instead of hard-coded colors, spacing, typography, shape, elevation, or motion when possible.
- Does not duplicate guidance already covered better on another page.
