export const NAV = [
  {
    title: 'Getting started',
    slug: 'getting-started',
    items: [
      {
        href: '/introduction.html',
        label: 'Introduction',
        id: 'introduction',
        description: 'Project overview, local setup, and npm scripts',
        keywords: 'install node npm dev build',
      },
    ],
  },
  {
    title: 'Foundations',
    slug: 'foundations',
    items: [
      { href: '/foundations/color.html', label: 'Color', id: 'color', description: 'Palette, semantic colors, light and dark surfaces', keywords: 'hex palette theme' },
      { href: '/foundations/typography.html', label: 'Typography', id: 'typography', description: 'Open Sans type scale, weights, and specimens', keywords: 'font text size rem' },
      { href: '/foundations/icons.html', label: 'Icons', id: 'icons', description: '16/20/24px sizes, solid vs outline guidance', keywords: 'icon size glyph' },
      { href: '/foundations/spacing.html', label: 'Spacing', id: 'spacing', description: '3px grid, margin and padding scale', keywords: 'margin padding grid gap' },
      { href: '/foundations/shape.html', label: 'Shape', id: 'shape', description: 'Border radius and border width tokens', keywords: 'radius corner pill' },
      { href: '/foundations/elevation.html', label: 'Elevation', id: 'elevation', description: 'Surface levels: sunken, default, raised, overlay', keywords: 'shadow depth layer' },
      { href: '/foundations/alignment.html', label: 'Alignment', id: 'alignment', description: 'Label and control alignment for forms and layouts', keywords: 'align form label' },
      { href: '/foundations/capitalization.html', label: 'Capitalization', id: 'capitalization', description: 'Title case vs sentence case for UI copy', keywords: 'title case label button' },
      { href: '/foundations/animation.html', label: 'Animation and Motion', id: 'animation', description: 'Motion tokens and transition guidance', keywords: 'motion transition animate', hidden: true },
    ],
  },
  {
    title: 'Interactive controls',
    slug: 'interactive-controls',
    items: [
      {
        href: '/components/button.html',
        label: 'Button',
        id: 'button',
        description: 'Primary, secondary, tertiary, outline — all states',
        keywords: 'action submit primary icon split group outline',
        children: [
          { href: '/components/button.html#primary-button', label: 'Primary button', id: 'button-primary' },
          { href: '/components/button.html#primary-button-icon', label: 'Primary button with icon', id: 'button-primary-icon' },
          { href: '/components/button.html#secondary-button', label: 'Secondary button', id: 'button-secondary' },
          { href: '/components/button.html#tertiary-button', label: 'Tertiary button', id: 'button-tertiary' },
          { href: '/components/button.html#outline-button', label: 'Outline button', id: 'button-outline' },
          { href: '/components/button.html#icon-button', label: 'Icon button', id: 'button-icon' },
          { href: '/components/button.html#link-button', label: 'Link button', id: 'button-link' },
          { href: '/components/button.html#link-icon-button', label: 'Link icon button', id: 'button-link-icon' },
          { href: '/components/button.html#split-button', label: 'Split button', id: 'button-split' },
          { href: '/components/button.html#split-button-icon', label: 'Split button with icon', id: 'button-split-icon' },
          { href: '/components/button.html#button-group', label: 'Button group', id: 'button-group' },
        ],
      },
      { href: '/components/hyperlink.html', label: 'Hyperlinks', id: 'hyperlink', description: 'Inline, standalone, internal, and external links', keywords: 'link anchor url' },
      { href: '/components/checkbox.html', label: 'Checkboxes', id: 'checkbox', description: 'Checkboxes, radio buttons, and accessibility', keywords: 'radio select option' },
      { href: '/components/forms.html', label: 'Forms', id: 'forms', description: 'Labels, inputs, selects, validation, field spacing', keywords: 'input field label validation' },
      { href: '/components/dropdown.html', label: 'Dropdowns', id: 'dropdown', description: 'Selection pickers and action menus', keywords: 'select menu picker' },
      { href: '/components/disabled-controls.html', label: 'Disabled Controls', id: 'disabled-controls', description: 'Panel, subsection, and control disable patterns', keywords: 'disabled readonly inactive' },
      { href: '/components/badge.html', label: 'Badge', id: 'badge', description: 'Status pills, counts, and notifications', keywords: 'tag pill count status' },
      { href: '/components/error-handling.html', label: 'Error Handling', id: 'error-handling', description: 'Inline validation, alerts, toasts, and loading', keywords: 'error toast alert validation' },
    ],
  },
  {
    title: 'Layout & content',
    slug: 'layout-content',
    items: [
      { href: '/components/dividers.html', label: 'Dividers', id: 'dividers', description: 'Full-width, inset, and vertical dividing lines', keywords: 'separator hr rule' },
      { href: '/components/borders.html', label: 'Borders', id: 'borders', description: 'Per-control border rules and emphasis styles', keywords: 'border outline' },
      { href: '/components/card.html', label: 'Cards', id: 'card', description: 'Vertical and horizontal content surfaces', keywords: 'card tile surface' },
      { href: '/components/list.html', label: 'Lists', id: 'list', description: 'Single-line, two-line, and datatable-style rows', keywords: 'list row table' },
      { href: '/components/grid-view.html', label: 'Grid View', id: 'grid-view', description: 'Tile-based file and media collections', keywords: 'grid thumbnail tile gallery' },
      { href: '/components/carousel.html', label: 'Carousel (Gallery)', id: 'carousel', description: 'Slideshow view with thumbnail strip', keywords: 'carousel slideshow gallery' },
      { href: '/components/collapse.html', label: 'Collapse', id: 'collapse', description: 'Progressive disclosure for secondary settings', keywords: 'accordion expand collapse' },
      { href: '/components/feature-panels.html', label: 'Feature Panels', id: 'feature-panels', description: 'Panel layout, sectioning, wizard flows', keywords: 'panel sidebar settings' },
    ],
  },
  {
    title: 'Navigation',
    slug: 'navigation',
    items: [
      { href: '/components/navbar.html', label: 'Navbar', id: 'navbar', description: 'Global navigation, search, and responsive behavior', keywords: 'header nav top bar' },
      { href: '/components/ribbon-groups.html', label: 'Ribbon Groups', id: 'ribbon-groups', description: 'Desktop ribbon layout and interaction', keywords: 'ribbon toolbar desktop' },
    ],
  },
  {
    title: 'Overlays',
    slug: 'overlays',
    items: [
      { href: '/components/tooltips-popovers.html', label: 'Tooltips & Popovers', id: 'tooltips-popovers', description: 'Explain vs interact — behavior and styling', keywords: 'tooltip popover hover' },
      { href: '/components/bubble.html', label: 'Bubble (Balloon)', id: 'bubble', description: 'Interactive contextual overlays with arrow', keywords: 'bubble balloon popover' },
      { href: '/components/dialog.html', label: 'Dialogs', id: 'dialog', description: 'Modal and modeless dialogs with action placement', keywords: 'modal dialog confirm' },
    ],
  },
  {
    title: 'UX principles',
    slug: 'ux-principles',
    items: [
      { href: '/guidelines/laws-of-ux.html', label: 'Laws of UX', id: 'laws-of-ux', description: 'Overview of heuristics, principles, Gestalt, and bias', keywords: 'ux laws heuristics' },
      { href: '/guidelines/heuristics.html', label: 'Heuristics', id: 'heuristics', description: 'Fitts, Hick, Jakob, Miller, and related rules of thumb', keywords: 'fitts hick jakob' },
      { href: '/guidelines/ux-principles.html', label: 'UX Principles', id: 'ux-principles', description: 'Doherty, Occam, Tesler, and design principles', keywords: 'doherty occam tesler' },
      { href: '/guidelines/gestalt.html', label: 'Gestalt', id: 'gestalt', description: 'Proximity, similarity, common region, visual grouping', keywords: 'gestalt proximity similarity' },
      { href: '/guidelines/cognitive-bias.html', label: 'Cognitive Bias', id: 'cognitive-bias', description: 'Peak-end, serial position, Von Restorff, Zeigarnik', keywords: 'bias memory psychology' },
    ],
  },
  {
    title: 'Standards',
    slug: 'standards',
    items: [
      { href: '/guidelines/responsive-design.html', label: 'Responsive Design', id: 'responsive-design', description: 'Breakpoints, touch targets, adaptive layouts', keywords: 'responsive mobile breakpoint' },
      { href: '/guidelines/accessibility.html', label: 'Accessibility', id: 'accessibility', description: 'WCAG 2.1 AA compliance, contrast, focus states', keywords: 'a11y wcag aria keyboard' },
    ],
  },
];

export const HOME_ENTRY = {
  href: '/index.html',
  label: 'Home',
  id: 'home',
  description: 'Style guide overview and links to all sections',
  keywords: 'home overview index',
};

export function flattenNavItems() {
  return NAV.flatMap((section) =>
    section.items
      .filter((item) => !item.hidden)
      .flatMap((item) => {
        const { children, ...parent } = item;
        const entries = [
          { ...parent, section: section.title, sectionSlug: section.slug },
        ];
        if (children) {
          entries.push(
            ...children.map((child) => ({
              ...child,
              section: section.title,
              sectionSlug: section.slug,
            }))
          );
        }
        return entries;
      })
  );
}
