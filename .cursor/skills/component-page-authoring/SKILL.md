---
name: component-page-authoring
description: Create or update component documentation pages in this repository's code-built style guide. Use when working in components/, adding component examples, documenting variants, states, accessibility, or usage guidance.
---

# Component Page Authoring

## Source Of Truth

Component pages in `components/` should document reusable UI patterns using this repository's existing tokens, shared component styles, and documentation structure.

Use:

- `components/` for nearby page structure and examples
- `styles/components.css` for shared component classes and states
- `styles/guide.css` for documentation shell and preview styling
- `tokens/` for visual values
- `guidelines/accessibility.html` for accessibility expectations

## Required Workflow

1. Inspect similar pages in `components/` before writing or editing a component page.
2. Define the component's purpose, variants, states, and usage boundaries.
3. Add live examples that use existing classes and tokens first.
4. Document when to use, when not to use, accessibility requirements, and related patterns.
5. Validate that examples are semantic, keyboard usable, and consistent with the design system.

## Authoring Rules

- Keep page copy practical and usage-focused.
- Prefer real UI examples over abstract descriptions.
- Include disabled, focused, hover, selected, empty, loading, or error states when relevant.
- Do not introduce one-off classes when an existing component class fits.
- Add shared CSS only when the behavior is reusable across the style guide.

## More Detail

- For the page workflow, read `workflow.md`.
- For final QA, read `checklist.md`.
