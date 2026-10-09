<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Performance decisions

- Serve the hero as responsive WebP files and keep below-the-fold media lazy or interaction-loaded to protect initial page speed.

## App email decisions

- Send company inquiry notifications through the managed template sender from the existing dedicated server handler, never SMTP or client code, to keep credentials private and delivery managed.
- Keep company inquiry notifications fixed to the commercial recipient with the submitter as Reply-To, so public requests cannot send arbitrary emails.
