# AIRAC change detector

This is the first safe version of Flugvellir's AIRAC change detector. It is a review tool only: official AIP, NOTAM and briefing sources remain authoritative for flight planning and operations.

## How it works

The detector reads the public eAIP issue index at `https://eaip.isavia.is/`. It parses the "Currently Effective Issue" section separately from "Next Issues", so a future AIRAC edition is never treated as the current operational edition just because it has already been published.

For comparison reports it:

1. Reads the ICAO list from `src/data/airports.js`.
2. Opens each selected AIRAC edition's `eAIP/menu.html`.
3. Finds only the main English aerodrome page (`1-en-GB.html`) for each Flugvellir ICAO.
4. Downloads those pages only.
5. Normalizes the page text by removing page chrome, generated HTML markup, generated identifiers, scripts, iframes, whitespace noise and formatting-only differences.
6. Compares the normalized text and writes a Markdown report with source URLs, retrieval times and AIRAC effective/publication dates.

If the eAIP index, edition menu or required aerodrome page cannot be parsed, the command fails with a clear error instead of guessing.

## How to run it

Discover the current and future AIRAC editions:

```bash
npm run airac:discover
```

Compare the currently effective edition with the first published future edition:

```bash
npm run airac:compare
```

Compare specific editions:

```bash
npm run airac:compare -- --from A06/2026 --to A07/2026
```

Limit a comparison to specific ICAOs while testing:

```bash
npm run airac:compare -- --from A06/2026 --to A07/2026 --icao BIRK,BIHN,BIHU
```

Run the offline fixture tests:

```bash
npm run test:airac
```

Generated reports are written to `airac-output/`, which is ignored by git.

## What it does not update

The detector does not modify `src/data/airports.js`, `src/data/airac-meta.js`, operational rules, the touch-and-go checker, generated website data or production content. It does not publish data to the live website and it does not open pull requests automatically.

The report is intentionally a human-review document. A maintainer still has to decide whether each detected difference affects Flugvellir's simplified airport records.

## Safety limitations

Text normalization reduces noisy diffs, but it is not a legal or operational interpretation of the AIP. It can miss changes outside the main English aerodrome pages, and it can flag harmless wording changes for manual review. Always check the official AIP, current NOTAMs and normal briefing sources before making operational decisions.
