# Design Token QA Checklist

Use this checklist before finishing a token change.

## Token Design

- The token represents a reusable design decision.
- The name is semantic and consistent with nearby tokens.
- The value belongs in the selected token file.
- Existing token names were reused when possible.
- Comments still describe the current token purpose.

## Theme Coverage

- Light theme values are checked.
- Dark theme values are checked when editing colors.
- Hover, active, focus, selected, disabled, error, and warning states remain distinguishable.
- Contrast remains aligned with `guidelines/accessibility.html`.

## Consumers

- Component CSS uses tokens instead of duplicate raw values.
- Updated tokens do not unintentionally change unrelated components.
- Documentation examples still match the token behavior.
- New tokens are imported through the existing `tokens/index.css` path if needed.

## Motion

- Durations and easing values remain purposeful.
- Motion changes preserve `prefers-reduced-motion`.
- Transitions are not added to properties that should update instantly for usability.

## Final Response

Mention:

- Which token area changed.
- Whether consumers or docs were updated.
- Any visual or accessibility risk.
- Any verification that was run, or why it was not run.
