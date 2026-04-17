# Running LLMs on Your Own Machine

A nine-minute tour of running large language models locally — no cloud, no API keys, no monthly bill. Three tools, one open model format, and a practical path to putting a capable AI on your laptop (or phone).

## 📽 View the presentation

**→ [caseproof.github.io/running-llms-locally](https://caseproof.github.io/running-llms-locally/)**

Use `→` / `Space` / `PageDown` to advance, `←` / `PageUp` to go back. Deep-dive subpages open from the `↗` links on relevant slides; press `Esc` to return.

## What's covered

- **Why local** — privacy, cost, offline, control
- **The three tools** — GPT4All, LM Studio, Ollama
- **Matching models to hardware** — RAM → model size heuristic
- **Deep dives** — LocalDocs (RAG), Obsidian + Ollama wiring, Ollama API cookbook, Modelfile persona gallery, mobile/on-device LLMs

## Repo contents

| File | What it is |
|------|------------|
| [`index.html`](index.html) | The presentation — single self-contained HTML file, no build step |
| [`script.md`](script.md) | Full written script of every slide and deep dive |
| [`notes.md`](notes.md) | Stripped-down speaker notes for presenting live |
| [`CLAUDE.md`](CLAUDE.md) | Working notes for Claude Code contributors |

## Running it locally

```bash
git clone https://github.com/caseproof/running-llms-locally.git
cd running-llms-locally
open index.html   # or serve with any static server
```

Everything is inlined — no dependencies, no build, no package manager.

## License

Content released under MIT unless otherwise noted.
