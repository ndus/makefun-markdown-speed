# Markdown render speed entry

An independent, dependency-free JavaScript Markdown renderer targeting the default HTML output of marked 18.1.3, including its GFM extensions and rendering quirks.

`parse.js` exports the synchronous, deterministic `parse(markdown)` function. It has no imports or I/O. A block pass builds the document structure and collects reference definitions; a second pass renders inline content. Delimiter matching uses masked ranges to keep code, links, HTML, and escaped punctuation opaque. Plain text is processed in batches, and output is assembled from string fragments.

## Run

The grader runs `node main.ts`. The driver reads `/input/cases.json`, renders each entry's `markdown`, and writes an array of HTML strings to `/output/html.json` in input order.

For a local run with Node 22:

```sh
MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=/tmp/markdown-output node main.ts
```

Only `main.ts` and `parse.js` are needed at runtime. Reference files and the baseline are development fixtures, not runtime dependencies.

## Check and benchmark

```sh
node check.mjs
node check.mjs --bench
```

The checker reports totals by group and the first differing character with excerpts for each failure. An optional case-ID or group substring filters failure details. Benchmark mode warms each renderer twice, then averages three complete corpus runs; file loading and JSON serialization are excluded.

Latest local result:

- **720/720 exact matches:** all 680 spec examples and all 40 generated documents.
- **Zero failing groups.** No remaining divergences were observed in the practice corpus.
- Warm-loop average: **383.9 ms** for this renderer, **690.5 ms** for the house baseline—**1.80× faster**, or approximately 44% less CPU time per corpus run as measured by elapsed time in the synchronous loop.
- The complete driver also produces 720 matching output strings.

Timing varies with the runtime and machine. Practice results do not establish equivalence for every possible Markdown string.
