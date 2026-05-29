---
name: style-guide-audit
description: Audit this repository's style guide for consistency, token usage, component quality, accessibility, responsive behavior, and documentation gaps. Use when reviewing the design system, checking pages for issues, or asking for a UX/UI style-guide audit.
---

# Style Guide Audit

## Source Of Truth

Audit against this repository's code-built design system:

- `tokens/` for visual foundations
- `styles/components.css` for shared component implementation
- `components/` for component documentation and examples
- `foundations/` for foundational rules
- `guidelines/` for UX, accessibility, responsive, and heuristic guidance
- `README.md` for project policy

## Required Workflow

1. Define the audit scope: full guide, tokens, components, foundations, guidelines, mockups, or a specific page.
2. Inspect representative files before forming conclusions.
3. Prioritize correctness, accessibility, token consistency, component reuse, and documentation gaps.
4. Report findings by severity with file references and clear fixes.
5. Separate real issues from optional improvements.

## Audit Rules

- Lead with bugs, contradictions, accessibility failures, and design-system drift.
- Prefer concrete file references over broad opinions.
- Check whether examples match documented rules and shared CSS.
- Treat hard-coded values as suspicious when a token exists.
- Do not recommend broad rewrites when a focused fix would solve the issue.

## More Detail

- For the audit workflow, read `workflow.md`.
- For the review checklist, read `checklist.md`.
