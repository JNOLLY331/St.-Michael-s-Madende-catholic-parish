---
name: Sacred Community
colors:
  surface: '#fff8f5'
  surface-dim: '#e1d8d4'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2ed'
  surface-container: '#f5ece7'
  surface-container-high: '#efe6e2'
  surface-container-highest: '#e9e1dc'
  on-surface: '#1e1b18'
  on-surface-variant: '#584141'
  inverse-surface: '#34302c'
  inverse-on-surface: '#f8efea'
  outline: '#8c7071'
  outline-variant: '#e0bfbf'
  surface-tint: '#af2b3e'
  primary: '#570013'
  on-primary: '#ffffff'
  primary-container: '#800020'
  on-primary-container: '#ff828a'
  inverse-primary: '#ffb3b5'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#2b271e'
  on-tertiary: '#ffffff'
  tertiary-container: '#413d33'
  on-tertiary-container: '#aea89a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b5'
  on-primary-fixed: '#40000b'
  on-primary-fixed-variant: '#8e0f28'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e9e2d3'
  tertiary-fixed-dim: '#cdc6b8'
  on-tertiary-fixed: '#1e1b13'
  on-tertiary-fixed-variant: '#4b463c'
  background: '#fff8f5'
  on-background: '#1e1b18'
  surface-variant: '#e9e1dc'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

This design system is built on the pillars of tradition, sanctuary, and community. It serves St. Michael Madende Catholic Parish by balancing the weight of ecclesiastical history with the warmth of a modern, welcoming parish.

The style is **Corporate Modern with Classic Editorial influences**. It utilizes high-quality whitespace to evoke a sense of peace and "sacred breath," avoiding the clutter often found in community portals. The visual language is grounded and intentional, ensuring that both elderly parishioners and younger families feel a sense of belonging and reverence. The interface should feel like a digital extension of the parish's physical architecture: solid, timeless, and open to all.

## Colors

The palette is derived from traditional liturgical significance, executed with modern digital accessibility in mind.

*   **Primary (Burgundy):** Used for key actions, navigation headers, and primary branding. It represents the blood of Christ and the sacrificial heart of the parish.
*   **Secondary (Gold):** Used sparingly for accents, icons, and decorative dividers. It signifies divinity and the light of faith.
*   **Tertiary (Cream):** This is the primary background color for the interface. It is softer and more welcoming than pure white, reducing eye strain and providing a "parchment" feel that suggests longevity.
*   **Neutral (Charcoal):** Used for text and deep structural lines to ensure high contrast and readability.

## Typography

The typography strategy employs a "Sacred and Secular" duality. 

**EB Garamond** is used for all headings. Its classical proportions and calligraphic roots provide an authoritative, historical voice. It should be used for Mass times, Scripture quotes, and Section titles.

**Source Sans 3** is used for all body copy, forms, and functional labels. It provides a clean, neutral contrast to the serif headings, ensuring that information regarding parish events and administration is highly legible for all age groups. Labels should utilize slight tracking (letter-spacing) and uppercase styling to provide a modern, organized feel.

## Layout & Spacing

The design system utilizes a **fixed-center grid** for desktop to maintain a sense of containment and focus, transitioning to a fluid layout for mobile. 

*   **Desktop:** 12-column grid with generous margins to focus the user's eye on the content.
*   **Rhythm:** Vertical rhythm is governed by an 8px base unit. Use larger "Section Gaps" (80px+) between major content blocks (e.g., between the Hero section and the Mass Schedule) to evoke a sense of calmness and avoid information density.
*   **Reflow:** On mobile, margins reduce to 20px, and complex grids collapse into a single-column stack. Sacred quotes or "Word of the Day" features should maintain extra padding to keep their visual importance.

## Elevation & Depth

Hierarchy is established through **tonal layering and soft ambient shadows**. Surfaces should not appear to "float" aggressively; instead, they should feel like they are resting gently on one another.

1.  **Base Layer:** Tertiary (Cream) surface.
2.  **Surface Layer:** White or light cream cards with extremely subtle, low-opacity (5-10%) burgundy-tinted shadows. This creates a "warm" depth rather than a cold, gray one.
3.  **Elevated State:** Used for interactive elements like hover states on cards. The shadow should expand slightly and soften, rather than becoming darker.
4.  **Borders:** Use thin, elegant borders (1px) in a faded Gold or light Neutral to define sections without creating visual noise.

## Shapes

The shape language is **Soft**. This choice avoids the clinical feel of sharp corners while maintaining the structured formality required for a religious institution. 

Primary buttons and input fields use a 0.25rem radius. Feature images and "Prayer Cards" may use the larger `rounded-lg` (0.5rem) to feel more inviting. Avoid pill-shaped buttons as they feel too "tech-startup" for this specific brand narrative; stick to soft rectangles.

## Components

*   **Buttons:** Primary buttons are solid Burgundy with white text. Secondary buttons are outlined in Gold with Burgundy text. High-emphasis buttons may feature a small, subtle Gold icon (like a cross or arrow).
*   **Cards:** "Ministry Cards" or "Mass Cards" should have a thin 1px border. The header of the card should use the serif font, while the details (time, location) use the sans-serif font.
*   **Input Fields:** Use a classic underlined or lightly boxed style with a Cream background. Focus states should transition the border color to Burgundy.
*   **Mass Schedule List:** A dedicated list component with clear horizontal dividers. Use the Gold accent color for the "Time" to make it the most scannable element.
*   **Donation/Tithe Module:** This should feel secure and grounded. Use a contained card layout with a clear, bold "Give" button and a soft background tint to differentiate it from informational content.
*   **Dividers:** Use custom decorative dividers featuring a small Gold diamond or cross at the center point to separate long-form text or sections.