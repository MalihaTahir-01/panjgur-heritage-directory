<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting published git history — force pushing, or rebasing/amending/squashing commits that are already pushed — as it rewrites history on Lovable's side and the user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the directory prototype as separate TanStack routes with shared site chrome, so each key screen is shareable and independently testable.
- Prototype-only listings are explicitly labeled and never given invented producer identities or contact information, so visitors cannot mistake samples for verified people.
- Submitted listing drafts live only in React state for this UI prototype, not in a public directory or a false authentication system; production publishing requires authenticated ownership and review.
- Language selection is a shared, session-persisted presentation state at the root, with explicit UI translations on every route; this keeps deep links gated consistently without implying real accounts or published listings.
