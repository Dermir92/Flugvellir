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

Preview what the daily automation would do without writing a report, pushing a branch or opening a pull request:

```bash
npm run airac:automation:dry-run
```

## What it does not update

The detector does not modify `src/data/airports.js`, `src/data/airac-meta.js`, operational rules, the touch-and-go checker, generated website data or production content. It does not publish data to the live website. The daily GitHub workflow can open a draft review pull request containing only generated review material.

The report is intentionally a human-review document. A maintainer still has to decide whether each detected difference affects Flugvellir's simplified airport records.

The currently displayed AIRAC status on the live site is maintained separately in `src/data/airac-meta.js`. It must not be advanced automatically just because a future AIRAC edition has been published or a comparison report has been generated.

## Daily GitHub automation

The workflow `.github/workflows/check-airac.yml` checks the official eAIP once per day at 06:17 UTC. It can also be run manually from the GitHub Actions tab with `workflow_dispatch`.

When nothing new is found, the workflow exits successfully without committing, pushing or opening a pull request.

When a published future AIRAC edition is found and `main` does not already contain a tracked comparison report for that target cycle, the workflow compares it with the immediately preceding published AIRAC edition. For example, if A06 to A07 already exists and A08 is newly available, the automation chooses A07 to A08 instead of skipping directly from A06 to A08.

The generated report is written under `docs/airac-reports/` and is labelled as generated, unofficial, review-only and not operational guidance. The workflow uses a predictable branch name such as `automation/airac-A08-2026` and opens or updates one draft pull request into `main`. It never marks the pull request ready for review, approves it or merges it.

Duplicate pull requests are prevented in two ways:

1. The tracked report filename records which consecutive AIRAC comparison has already been merged.
2. The automation branch name is based on the target AIRAC cycle, so repeated runs update the same draft branch instead of creating another pull request.

The workflow also compares regenerated reports while ignoring retrieval timestamp-only differences. This means repeated daily runs should not create new commits when the eAIP content is unchanged.

Before changing an existing automation branch, the workflow checks whether that branch already has an open pull request into `main`. If the open pull request is not a draft, the workflow fails safely before pushing anything. If an open draft pull request already has the same generated report, the workflow exits successfully. If an old automation branch exists but no open pull request is reviewing it, the workflow may create a new draft pull request from that branch instead of assuming the work is already being reviewed.

Manual review must check:

- every changed aerodrome section in the generated report;
- whether the change affects Flugvellir's simplified airport data;
- the target edition's publication date;
- the target edition's effective date;
- the report generation date and source URLs;
- whether `src/data/airac-meta.js` should be updated for the edition currently shown on the live site;
- runway designators, declared distances, frequencies, ATS hours, fuel and services, procedures, obstacles, warnings and chart references;
- official AIP, NOTAM, meteorological, briefing and ATC sources before making any operational decision.

These are separate decisions: a publication date means the future AIRAC material may be reviewed, an effective date controls when that edition becomes operationally current, report generation only records when the automation fetched and compared pages, and `src/data/airac-meta.js` controls the AIRAC cycle displayed by the live site. Do not update the displayed AIRAC metadata unless the maintainer explicitly decides the shown current edition should change.

To disable scheduled checks, edit `.github/workflows/check-airac.yml` and remove or comment out the `schedule` block. Manual `workflow_dispatch` can be left in place if you still want to run checks on demand.

## Safety limitations

Text normalization reduces noisy diffs, but it is not a legal or operational interpretation of the AIP. It can miss changes outside the main English aerodrome pages, and it can flag harmless wording changes for manual review. Always check the official AIP, current NOTAMs and normal briefing sources before making operational decisions.
