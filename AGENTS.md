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

- All quotes and indices come through `marketData`; subscribe with `useMarketData` so prices update consistently without hardcoding UI values.
- Fetch allowlisted Yahoo quotes in a public read-only server function with five-minute caching, bounded concurrency and source timestamps; label unofficial quotes as latest available, not guaranteed live.
- Preserve demo fundamentals and research separately from verified quote overlays, and explicitly label fallback prices and illustrative charts to avoid implying verified investment research.
- Watchlist and portfolio persist in localStorage via useLocal until authentication/backend is enabled.
