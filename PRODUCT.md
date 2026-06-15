# Product

## Register

product

## Users

Retail banking customers using a self-serve web app to manage personal accounts. They open savings/current accounts, deposit and withdraw, transfer funds, view statements, and explore loans, cards, investments, and crypto. Context is everyday money management on desktop or mobile; the primary need is to complete a financial task quickly and with confidence that it is secure.

## Product Purpose

BSNB (Bhumil Shah National Bank) is a full-stack banking system. The frontend is the customer-facing surface for authentication and core banking operations backed by an Express/PostgreSQL API. Success is a customer completing a transaction (transfer, deposit, statement lookup) without confusion or doubt about whether it worked.

## Brand Personality

Trustworthy, modern, approachable. Three words: secure, clear, efficient. The interface should feel like a real bank a person trusts with their money, not a flashy fintech demo. Confidence over excitement; calm over urgency.

## Anti-references

- The previous maroon-on-white look that read as a generic template.
- Loud neobank gradients-everywhere and gamified dashboards.
- Identical gray icon-card grids with no color differentiation.
- Cramped, all-emoji iconography standing in for a real icon set.

## Design Principles

- **Earned familiarity.** Standard banking affordances (top nav, cards, modals, forms) done cleanly; the tool disappears into the task.
- **Color carries meaning.** Teal/gold anchor the brand; per-action color tints aid scanning; green/red reserved for money in/out and success/error.
- **Confidence at every step.** Clear labels, visible loading and validation states, no dead ends.
- **Consistent vocabulary.** One button shape, one input style, one icon family across every screen.

## Accessibility & Inclusion

Target WCAG 2.1 AA: body text ≥4.5:1, large text ≥3:1. Visible focus rings on all interactive elements. Honor `prefers-reduced-motion` (animations collapse to instant). Do not rely on color alone for transaction direction (pair color with +/- and arrow icons).
