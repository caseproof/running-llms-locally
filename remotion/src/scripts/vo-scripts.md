# Voiceover Scripts — Running LLMs on Your Own Machine

Ten 45-second scripts, one per slide. Narrator is singular, second person, conversational. Technical terms preserved.

---

## Slide 1 — Title — Director: Wes Anderson
VO: Here's a strange idea. The smartest software on your laptop doesn't have to live in somebody else's data center. It can live on your disk, in your RAM, answering to you and only you. That's what the next nine minutes are about. Three tools — GPT4All, LM Studio, Ollama. One open model format. Zero cloud. By the end, you'll know which one to install tonight, which model to pair it with, and why your laptop is a more capable machine than you've been giving it credit for. Let's begin.

Visual cues:
- Symmetrical hero title card, cream paper, serif type, hairline rules
- Small "Est. 9 min / 10 slides" tag, typewriter style
- Three neatly boxed logos side-by-side: GPT4All, LM Studio, Ollama
- A tiny animated chapter marker "01" in corner
- Warm grain overlay, center-anchored composition

---

## Slide 2 — The case for local — Director: David Fincher
VO: Every prompt you send to a cloud model is a small admission. Your question, your draft, your half-formed idea — logged somewhere, billed somewhere, dependent on a signal you don't control. Local flips all four of those. Your data never leaves the device. Inference is free after download. It works on a plane, in a basement, on a train through a tunnel. And you can swap models like lenses. The tradeoff is honest: local models are slower and less brilliant than the frontier. But for summarizing, drafting, answering questions about your own notes — they are entirely, unremarkably enough.

Visual cues:
- Black background, thin green monospace type
- Four metrics blocking in: PRIVACY, COST, OFFLINE, CONTROL — each with a tick
- A live-looking terminal showing zero outbound connections
- Small counter: "0 packets sent to cloud"
- Grid lines, clinical crosshair on the tradeoff block

---

## Slide 3 — The cast of characters — Director: Wes Anderson
VO: Three tools dominate this space, and they are not rivals so much as siblings. GPT4All is the softest landing — looks like a chat app, hides the gears, great for the friend who has never touched a terminal. LM Studio is the explorer's toolkit — every knob visible, a built-in Hugging Face browser, MLX speed on Apple chips. Ollama is the developer's foundation — a tiny command-line tool and a daemon that speaks OpenAI. All three are free. All three run GGUF. Download a model once, any of them can load it.

Visual cues:
- Three vertical character cards, symmetrical, framed in gold rule
- Typewriter labels: "01 EASIEST", "02 EXPLORER", "03 DEVELOPER"
- Tiny illustrated icons — chat bubble, dials, terminal prompt
- Pastel paper tones: cream, rose, sage
- Center tagline ribbon: "All free. All GGUF."

---

## Slide 4 — Choose by your device — Director: David Fincher
VO: Before you pick a tool, pick by what's on your desk. Apple Silicon — any of the three, though LM Studio pulls ahead by roughly thirty percent thanks to MLX. Intel Mac or older laptop — skip the MLX conversation, grab GPT4All or Ollama. Windows and Linux — all three run, Ollama leads headless, LM Studio leads desktop. Then match RAM to model. Eight gigs wants a 3B. Sixteen is the sweet spot for 7 to 8B. Thirty-two handles 13B comfortably. Bigger isn't smarter for your task. It's slower.

Visual cues:
- Dark grid, green terminal aesthetic
- Device comparison bars animating in: Apple Silicon, Intel, Win/Linux
- RAM-to-model table rendered as a data grid, rows highlighting in sequence
- Tiny stopwatch icon next to "30% faster MLX"
- Scanline flicker, high-contrast typography

---

## Slide 5 — GPT4All — Director: Wes Anderson
VO: If you've never run a model locally before, start here. GPT4All is the tool I'd hand to a non-technical friend without a single warning label. You install it, you pick a model from a short curated list, you start typing. No terminal. No config file. No decision paralysis. The real gift is LocalDocs. Point it at a folder — your Obsidian vault, a stack of PDFs, exported Notion pages — and that folder becomes retrieval context. Private RAG, zero setup, sources cited at the bottom of every answer. You can always graduate later.

Visual cues:
- Illustrated friendly desktop app window, symmetrical, paper-textured
- Animated folder sliding into a labeled "LocalDocs" tray
- Hand-drawn citation tags fluttering down at the bottom of a chat bubble
- Soft yellow and robin's-egg palette
- Center title banner: "The softest landing"

---

## Slide 6 — LM Studio — Director: David Fincher
VO: Where GPT4All hides complexity, LM Studio surfaces it. Every parameter is a visible knob. You browse Hugging Face without leaving the app. You set per-chat system prompts, temperature, context length, quantization. You flip on MLX and watch the tokens-per-second jump. You can even run it in server mode — a local OpenAI-compatible endpoint that any client can hit. And when you want to automate, there's the `lms` CLI. The tradeoff is real: more surface area means more to learn. If you've never done this, it can feel like a cockpit. That's the point.

Visual cues:
- Dense dashboard UI, cold blues and terminal greens
- Sliders and numeric inputs highlighting in sequence: temperature, context, top_p
- A tokens/sec graph line spiking when "MLX" toggles on
- Terminal window in corner showing `lms` command
- Crosshair framing on the words "cockpit"

---

## Slide 7 — Ollama — Director: David Fincher
VO: Three lines. Install, pull, run. That's Ollama. It installs a background daemon, pulls a GGUF model, drops you into a REPL. No window to babysit. More importantly, it exposes an OpenAI-compatible API at localhost port 11434. Anything that speaks ChatGPT can instead speak to your machine. Open WebUI, Chatbox, Obsidian plugins, your own Python script — same daemon, many clients. Point an existing OpenAI SDK at that base URL, pass any non-empty API key, and your entire codebase runs locally. Two lines changed. Zero vendor.

Visual cues:
- Full-bleed terminal, monospace green on black
- Three commands typing in sequence: brew install, ollama pull, ollama run
- Network diagram: one daemon node, arrows out to five client icons
- URL callout box: `http://localhost:11434`
- Timestamped log lines scrolling in the margin

---

## Slide 8 — The Ollama power move — Director: Wes Anderson
VO: The Ollama Mac app has no system-prompt field. At first that feels like a limitation. It isn't. It's an invitation. You write a tiny text file — a Modelfile — declaring a base model and a personality. `ollama create steve-jobs`. Now every client on your machine sees "steve-jobs" in its model dropdown. The persona is portable. Shareable. Version-controllable. Email the Modelfile to a friend and they run one command and have the same character. It's the lightest-weight way to ship an AI tool that has ever existed. No keys. No accounts.

Visual cues:
- Symmetrical split: Modelfile on paper (left), terminal command on paper (right)
- Hand-drawn arrow curving between them to a model dropdown illustration
- Tiny label cards: "FROM", "SYSTEM", "PARAMETER"
- Envelope icon flying Modelfile from one desk to another
- Warm ochre and ivory palette

---

## Slide 9 — Obsidian — Director: Wes Anderson
VO: A local model only knows what it was trained on. Your Obsidian vault knows what you know. Connect the two and something changes. The Copilot plugin puts a chat sidebar inside your notes, pointed at your local Ollama — no cloud calls, ever. Smart Connections embeds every note into a local vector DB, retrieving the relevant pages before the model speaks. And Ollama MCP turns the whole vault into a live context source any MCP-aware client can query. One gotcha worth saving you an afternoon — set OLLAMA_ORIGINS to app colon slash slash obsidian before starting the daemon. Your notes are the brain. The LLM is the mouth.

Visual cues:
- Open book illustration with glowing page connecting to a chat bubble
- Three plugin cards stacked symmetrically: Copilot, Smart Connections, MCP
- A small "CORS fix" paper sticky note with OLLAMA_ORIGINS
- Vault-to-brain metaphor in pen-and-ink style
- Muted plum and ivory palette

---

## Slide 10 — Pick your starting point — Director: David Fincher
VO: Here's the decision, stripped to three branches. Never tried local AI — install GPT4All tonight and start with LocalDocs. Apple Silicon, want every knob — LM Studio. Developer, want a foundation to build on — Ollama. You don't actually have to choose. Install all three. They share the same GGUF files, so your downloads aren't locked to any one tool. The links are gpt4all.io, lmstudio.ai, ollama.com, and huggingface.co for models. Pick one. Install it in the next ten minutes. Go make your laptop a little smarter.

Visual cues:
- Dark decision-tree diagram, three clean branches
- Each branch terminating in a tool name and URL, monospace
- Final frame: four URLs stacked as a command-line receipt
- Subtle countdown or "10 MIN" stamp in corner
- High-contrast white-on-black closer: "MAKE YOUR LAPTOP SMARTER"

---
