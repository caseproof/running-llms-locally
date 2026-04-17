# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Standalone HTML slide deck: "Running LLMs on Your Own Machine". Not a WordPress site — parent `/Users/sethshoultes/Local Sites/CLAUDE.md` describes the surrounding Local by Flywheel environment, but this directory is a single self-contained presentation and does not use WordPress, npm, or any build pipeline.

## Files

- `local-llms-presentation_2.html` — the entire deck. All CSS, HTML, and JS inlined in one file. Open directly in a browser; no server or build step.
- `.wolf/anatomy.md` — auto-generated token index (Great Minds agency artifact, ignore unless asked).

## Architecture

Single-file deck with two view layers:

- **Slides** — `<section class="slide" data-slide="N">` (10 slides). Exactly one carries `.active`. Navigation via `ArrowRight`/`Space`/`PageDown` forward, `ArrowLeft`/`PageUp` back. Counter + progress fill update on change (see keydown handler ~line 2436).
- **Subpages** — `<section class="subpage" data-subpage="NAME">` overlays for deep dives: `localdocs`, `obsidian`, `ollama-api`, `modelfile`, `mobile`. Opened by `.deep-dive[data-subpage]` links via `openSubpage()` (~line 2528). Subpages overlay the current slide; closing returns to it.

Design tokens live in `:root` CSS vars (`--paper`, `--ink`, `--accent`, etc.) — newspaper/terminal aesthetic. Fonts: Fraunces, Geist, JetBrains Mono (Google Fonts CDN).

## Editing Notes

- To add a slide: bump the counter total (`#slide-counter` starts `01 / 10`), add a new `<section class="slide" data-slide="N">`, verify the nav handler's bounds.
- To add a subpage: add `<section class="subpage" data-subpage="NAME">` and a trigger `<a class="deep-dive" data-subpage="NAME">` on the originating slide.
- Keep everything inlined — no external JS/CSS assets by design.
