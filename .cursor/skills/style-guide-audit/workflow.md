# Style Guide Audit Workflow

Use this workflow when auditing the design system or reviewing a style-guide change.

## 1. Set Scope

Clarify the target:

- Full repository audit
- Token audit
- Component page audit
- Accessibility audit
- Responsive audit
- Documentation consistency audit
- Specific file or feature audit

For broad audits, sample across `tokens/`, `styles/`, `components/`, `foundations/`, and `guidelines/` before reporting.

## 2. Inspect The System

Review the relevant sources:

- `README.md` for source-of-truth policy
- `tokens/index.css` and related token files
- `styles/components.css` for shared component rules
- Nearby component pages in `components/`
- Related foundation pages in `foundations/`
- Relevant UX or accessibility pages in `guidelines/`

Compare documentation, examples, and CSS implementation. The same rule should not be described one way and implemented another way.

## 3. Look For High-Value Issues

Prioritize:

- Accessibility gaps: focus, labels, keyboard access, contrast, reduced motion
- Token drift: raw values where tokens exist, inconsistent theme values, duplicate tokens
- Component drift: examples that bypass shared classes or contradict usage guidance
- State gaps: missing hover, focus, selected, disabled, error, loading, or empty states
- Responsive gaps: layouts that only work at one width
- Documentation gaps: unclear when-to-use guidance, missing variants, missing related patterns
- Conflicts: screenshots, mockups, docs, tokens, and CSS disagreeing

Avoid low-value nitpicks unless the user asks for a detailed polish pass.

## 4. Report Findings

Use this structure:

1. Findings ordered by severity
2. Open questions or assumptions
3. Short summary

For each finding, include:

- What is wrong
- Why it matters
- Where it appears
- Suggested fix

If there are no issues, say that clearly and mention any remaining test or review gaps.

## 5. Recommend Fixes Conservatively

Prefer:

- Token reuse over new values
- Shared component fixes over repeated local patches
- Documentation updates when implementation is already correct
- Focused CSS changes over broad restructuring

Ask before recommending a change that would alter the visual language across many pages.
