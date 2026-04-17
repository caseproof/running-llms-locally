# Running LLMs on Your Own Machine — Full Script

> A nine-minute tour. Three tools. One open model format. Zero cloud.
> A practical guide to putting a capable AI on your laptop.

---

## Slide 1 — Title

**Running LLMs on your *own* machine.**

Three tools. One open model format. Zero cloud. A practical guide to putting a capable AI on your laptop.

GPT4All · LM Studio · Ollama

*For the tech-curious — Est. 9 min · 10 slides*

---

## Slide 2 — The case for local

**Why bother running models locally?**

1. **Privacy** — Your data never leaves the device. Nothing is logged by OpenAI, Anthropic, or anyone else.
2. **Cost** — Once the model is downloaded, inference is free. No per-token fees, no monthly bills.
3. **Offline** — Works on a plane, in a basement, or on a laptop with no internet. The model lives on your disk.
4. **Control** — Swap models, tune prompts, build private assistants that know your work. You're the platform.

**The tradeoff:** local models are slower than frontier models and not as smart. But for a lot of work — summarizing, drafting, Q&A over your notes — they're plenty.

---

## Slide 3 — The cast of characters

**Three tools dominate the local-LLM space.**

### Tool 01 · Easiest — GPT4All
For beginners & non-technical users. Looks like a chat app. Hides the complexity. Great first step if you've never done this before. Friendly desktop app. → gpt4all.io

### Tool 02 · Explorer — LM Studio
For model browsers & explorers. Feature-rich. Beautiful GUI. Built-in Hugging Face browser. Every knob exposed. Rich desktop GUI. → lmstudio.ai

### Tool 03 · Developer — Ollama
For developers & scripters. A tiny command-line tool plus a minimal Mac app. Dead-simple API that speaks OpenAI. CLI + simple app. → ollama.com

All free. All run GGUF models. All can share each other's models.

---

## Slide 4 — The most important question

**Choose by your device.**

- **Apple Silicon (M1–M4):** Any of the three. LM Studio edges ahead with MLX support — roughly 30% faster on Apple chips.
- **Intel Mac / older laptop:** Reach for GPT4All or Ollama. LM Studio works, but its MLX advantage disappears.
- **Windows / Linux:** All three work. Ollama leads for headless server use, LM Studio for desktop.

### RAM → model-size heuristic
| RAM | Pick |
|-----|------|
| 8 GB | 3B models — Phi, Gemma 2B/3B |
| 16 GB | 7–8B models — Llama 3.1 8B, Qwen 7B, Mistral 7B *(sweet spot)* |
| 32 GB | 13B comfortable; 70B quantized if patient |
| 64 GB+ | 70B models at good quality |

More parameters = smarter but slower. You don't need a 70B model to summarize your notes.

*Deep dive: What about phones? — On-device LLMs on iOS & Android*

---

## Slide 5 — Tool 01 · The softest landing

**GPT4All — the friendliest front door.**

The tool I'd hand to a non-technical friend. Install, pick a model from a short curated list, start chatting. No terminal. No decision paralysis.

- Looks like a normal chat app — no CLI, no config files
- Built-in LocalDocs: drop a folder, it becomes searchable context
- Curated model list — no decision paralysis
- Cross-platform, free, open source
- Familiar thread-style chat UX, like ChatGPT

**LocalDocs is the killer feature.** Private RAG over your own files with zero setup. You can always graduate to LM Studio or Ollama later.

*Deep dive: LocalDocs — setup, RAG diagram, tips*

---

## Slide 6 — Tool 02 · Power-user toolkit

**LM Studio — everything surfaced.**

Where GPT4All hides complexity, LM Studio surfaces it. Every model parameter is a visible knob.

- Built-in model discovery — browse Hugging Face without leaving the app
- MLX backend on Apple Silicon (noticeably faster)
- Per-chat system prompt, temperature, context length, quantization
- Local server mode with OpenAI-compatible API
- `lms` CLI for scripting workflows

**The tradeoff:** more surface area means more to learn. If you're brand new, it can feel overwhelming.

---

## Slide 7 — Tool 03 · Developer foundation

**Ollama — the foundation layer.**

```bash
# one-time install
$ brew install ollama

# pull a model
$ ollama pull llama3.1:8b

# run it
$ ollama run llama3.1:8b
```

### Inside the REPL
```
$ ollama run llama3.1:8b

>>> Write a haiku about Monday morning.

Alarm clock lying,
coffee not strong enough yet —
the week stares me down.

>>> /?   # list slash commands
>>> /bye # exit
```

- Runs as a background daemon — no window to babysit
- Exposes an OpenAI-compatible API at `localhost:11434`
- Any app that speaks ChatGPT can instead speak to your local Ollama

### One daemon, many clients
The real magic isn't the CLI — it's that every other chat app in the ecosystem can talk to the same Ollama instance: Open WebUI, Chatbox, Msty, Page Assist, Obsidian plugins, your own scripts.

*Deep dive: API cookbook — curl, Python, streaming, tools*

---

## Slide 8 — The Ollama power move

**Bake personas into the model itself.**

The Ollama Mac app doesn't have a system-prompt field. At first that seems limiting — until you realize you can bake the personality straight into a model file and it becomes portable across every client.

### 1. Write the Modelfile
```
FROM gemma3:4b

SYSTEM """You are Steve Jobs. Direct.
Simplicity over features. Ask piercing
questions. Demand insanely great."""
```

### 2. Build & run it
```bash
$ ollama create steve-jobs -f Modelfile
$ ollama run steve-jobs
```

**Flow:** Modelfile → `ollama create` → shows in every client's model dropdown → portable persona.

*Deep dive: Persona gallery — 5 ready-to-copy Modelfiles + syntax ref*

---

## Slide 9 — Bonus round

**Obsidian: your notes become the AI's memory.**

Local LLMs get exponentially more useful when they can reach into your actual knowledge — not just their training data. If you keep notes in Obsidian, three plugins turn your vault into live context.

- **Plugin 01 — Copilot for Obsidian:** Chat sidebar inside your vault. Points at your local Ollama or LM Studio — no cloud calls.
- **Plugin 02 — Smart Connections:** Embeds every note into a local vector DB. The LLM retrieves the most relevant pages before answering.
- **Protocol 03 — Ollama MCP:** Your vault becomes a live context source any MCP-aware client can query on demand.

**Your notes are the brain. The LLM is the mouth.**

*Deep dive: Setup walkthrough — plugins, CORS fix, starter prompts*

---

## Slide 10 — Pick your starting point

**Where to begin.**

### Decision tree
- Never tried local AI? → **GPT4All**
- Apple Silicon, want it all? → **LM Studio**
- Developer who wants flexibility? → **Ollama**

You can install all three. They share models through the GGUF format — your downloads aren't locked to any one tool.

### Resources
- **gpt4all.io** — APP
- **lmstudio.ai** — GUI
- **ollama.com** — CLI
- **huggingface.co/models** — MODELS

*Now go make your laptop a little smarter.*

---

# Deep Dives

## Deep Dive · LocalDocs (GPT4All)

**LocalDocs — private RAG, zero setup.**

Point GPT4All at a folder. It reads, indexes, and cites your documents when it answers — all on your machine, no cloud, no account.

### What it actually does
LocalDocs turns a folder on your disk into retrieval context for whatever model you're chatting with. Ask "what's in my meeting notes from last Tuesday?" and it will find the relevant passages, hand them to the LLM, and ground the answer in your actual documents. The pattern is called **retrieval-augmented generation (RAG)** — it's how every "chat with your PDFs" product works under the hood.

### How RAG works (simplified)
`Documents → Chunks → Embeddings → Retrieve → Answer`

1. **Documents** — PDFs, notes, text
2. **Chunks** — split into passages
3. **Embeddings** — vectors per chunk
4. **Retrieve** — match your query
5. **Answer** — LLM + context

Your question pulls the three-to-five most relevant chunks from your vault. The LLM only sees those — plus the question.

### Setup in four steps

**Step 01 — Install GPT4All and download a chat model.** Grab the installer from gpt4all.io. Open the app, go to Models, and pick a model that fits your RAM — Llama 3.1 8B Instruct is a solid default for 16 GB machines.

**Step 02 — Create a LocalDocs collection.** Click LocalDocs in the sidebar, then + Add Collection. Give it a name (e.g. `research`, `company-wiki`) and point it at a folder. GPT4All will watch that folder and reindex when files change. Good folders to try: your Obsidian vault, a folder of PDFs you've been meaning to read, a dump of exported Notion pages, or a project-specific docs directory.

**Step 03 — Pick an embedding model.** The first time you add a collection, GPT4All will download a small embedding model (Nomic's embedder, ~137 MB). This runs locally too — no API calls. Once it finishes indexing, you'll see a chunk count next to the collection name.

**Step 04 — Chat with it enabled.** Open a new chat, toggle your collection on in the top bar, and ask a question. GPT4All will cite the source files it used at the bottom of each answer. Click a citation to open the source passage.

### What works well, what struggles

**Works well:**
- Markdown and text notes — clean structure, easy to chunk
- PDFs with real text (not scanned images)
- Medium-sized collections — hundreds to low-thousands of documents
- Focused questions with specific keywords
- Stable content that doesn't change daily

**Struggles with:**
- Huge codebases — structure-aware tools do better
- Scanned PDFs without OCR — nothing to embed
- Vague questions like "what's important?"
- Cross-document reasoning that needs five sources synthesized
- Fast-changing content — reindexing has cost

### Tips from the field
- **Start narrow.** One focused collection (e.g. "Q4 planning docs") outperforms one giant "everything" collection — retrieval is easier when the haystack is smaller.
- **Name collections like categories.** You can toggle them per chat, so it helps to have `legal`, `research`, `meeting-notes` rather than one lump.
- **Check the citations.** If the model cites the wrong chunk, the issue is almost always retrieval, not the model — try rephrasing your question with more specific terms.
- **Chunk size matters.** GPT4All's defaults are reasonable, but if answers feel fragmented, you may want larger chunks. Fragmented retrieval = fragmented answers.

**Privacy note:** LocalDocs never sends your documents to any server. The embedder runs locally, the LLM runs locally, the vector store lives on your disk. If you need to prove that to a security team, point them at the open-source code on GitHub.

---

## Deep Dive · Obsidian

**Your vault, made chat-able.**

A step-by-step for wiring Obsidian Copilot to a local Ollama, with the gotchas that will otherwise cost you an afternoon.

### The stack you're building
Four pieces: **Obsidian** (your notes), **Ollama** (runs the model), a **chat model** (answers questions), and an **embedding model** (makes your notes searchable by meaning, not just keywords). The glue is the **Copilot plugin** by Logan Yang — it supports cloud models too, but we're going fully local.

### Step-by-step setup

**Step 01 — Install Ollama and pull two models.** One model for chat, one for embeddings. `nomic-embed-text` is a small, fast embedder that pairs well with most chat models.
```bash
# chat model
$ ollama pull llama3.1:8b

# embedding model for RAG
$ ollama pull nomic-embed-text
```

**Step 02 — Fix the CORS trap (the afternoon-saving step).** Obsidian calls Ollama from its renderer process, and Ollama will refuse the call unless you whitelist the Obsidian origin. This is the single most common reason "it just won't connect." Quit the Ollama app, then in a terminal:
```bash
# macOS / Linux
$ OLLAMA_ORIGINS=app://obsidian.md* ollama serve
```
Windows (PowerShell): `$env:OLLAMA_ORIGINS="app://obsidian.md*"; ollama serve`
Make this permanent on macOS: `launchctl setenv OLLAMA_ORIGINS "app://obsidian.md*"`, then restart the Ollama app. You won't have to run `ollama serve` manually anymore.

**Step 03 — Install the Copilot plugin.** In Obsidian: Settings → Community plugins → turn off restricted mode if it's on → Browse → search Copilot → install and enable the one by Logan Yang.

**Step 04 — Wire up the chat model.** Open Copilot settings. Under Add Custom Model:
- Model name: `llama3.1:8b` — must match exactly what `ollama list` shows
- Provider: Ollama
- Base URL: `http://localhost:11434` (default, usually auto-filled)
- CORS: enable it in the model form

Click Verify. Green check means you're in. Set it as your default chat model at the top of settings.

**Step 05 — Wire up the embedding model.** In Copilot's QA settings, set:
- Embedding model: `nomic-embed-text`
- Provider: Ollama

Then click Index Vault (or similar). First-time indexing takes a few minutes for large vaults. Subsequent reindexes are incremental.

### Starter prompts to try
- **Summarize:** "Summarize my notes from the last 30 days about [topic]."
- **Retrieve:** "What have I written about [person / project / concept]?"
- **Connect:** "Find connections between [note A] and [note B]."
- **Extract:** "Pull out every action item I've written this week."
- **Teach:** "Based on my notes, what don't I understand yet about [topic]?"

### Smart Connections — the lightweight alternative
If Copilot feels like too much apparatus, **Smart Connections** is a simpler plugin. It embeds your notes into a local vector DB and shows the most similar notes in a sidebar as you write — no chat, just discovery. Pair it with Copilot for chat, or use it alone for serendipity.

### Troubleshooting

**It won't connect:**
- CORS: re-check `OLLAMA_ORIGINS` is set and Ollama was restarted
- Port conflict: is anything else on 11434?
- Firewall: try `curl localhost:11434` — should return "Ollama is running"

**Answers are thin:**
- Context window too short — try `num_ctx 32768` in the model settings
- Wrong embedding model — small vaults do fine with default; large vaults benefit from bigger embedders
- Chat model too small — a 3B model will be weak on synthesis; try 8B+

**Tip on context:** Copilot respects the `num_ctx` you set on the Ollama model. If you're getting truncated answers on long notes, run `ollama run llama3.1:8b`, then `/set parameter num_ctx 32768`, then `/save llama3.1:8b` to bake it in.

---

## Deep Dive · Ollama API Cookbook

**The Ollama daemon speaks two protocols:** its own native API and an OpenAI-compatible one. Pick the second and most of your existing code works unchanged.

### The one-line mental model
Ollama runs a local HTTP server at `http://localhost:11434`. Any client that can make an HTTP request can use it. If that client already speaks the OpenAI API, point its `base_url` at `http://localhost:11434/v1` and the API key can be any non-empty string.

### Quickstart — curl
```bash
$ curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1:8b",
  "messages": [{"role": "user", "content": "why is the sky blue?"}],
  "stream": false
}'
```

### Python with the OpenAI SDK
If you already use `openai`, change two lines and your whole codebase runs locally.
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # required, but unused
)

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[
        {"role": "system", "content": "You are a terse assistant."},
        {"role": "user", "content": "Summarize the French Revolution in 3 bullets."},
    ],
)

print(response.choices[0].message.content)
```

### Streaming
```python
stream = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "tell me a short story"}],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
```

### Tool / function calling
Recent Ollama versions and recent models (Llama 3.1, Qwen 2.5, Mistral) support structured tool calls. Same OpenAI-compatible shape:
```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "weather in Paris?"}],
    tools=tools,
)
```
**Heads up:** smaller models are unreliable at tool-calling. Stick to 7B+ and check `response.choices[0].message.tool_calls` — it may be `None` if the model decided not to call the tool.

### Embeddings
```python
response = client.embeddings.create(
    model="nomic-embed-text",
    input="the quick brown fox",
)
vector = response.data[0].embedding  # list[float], 768 dims
```

### Give Ollama a nicer face — Open WebUI in 3 commands
```bash
$ docker run -d -p 3000:8080 \
    --add-host=host.docker.internal:host-gateway \
    -v open-webui:/app/backend/data \
    --name open-webui --restart always \
    ghcr.io/open-webui/open-webui:main
```
Visit `http://localhost:3000`. Create an account (stored locally), and it auto-discovers your Ollama models.

### Common pitfalls
- **"Connection refused"** — Ollama isn't running. Start it: `ollama serve` (or open the Mac app).
- **"Model not found"** — you didn't pull it yet. `ollama pull <model>`.
- **"CORS error"** from a browser app — set `OLLAMA_ORIGINS` to your app's origin before starting Ollama.
- **Answers get cut off** — context too short. Save a version of the model with a bigger `num_ctx`.

---

## Deep Dive · Modelfile Gallery

Five ready-to-use personas plus the syntax reference you'll keep coming back to. Copy, customize, share.

### Modelfile syntax reference
A Modelfile is a plain text file — no extension required.

- `FROM <model>` — the base model to build on (required)
- `SYSTEM """..."""` — the system prompt, baked in
- `PARAMETER temperature 0.7` — 0.0 is deterministic, 1.0+ is chaotic
- `PARAMETER num_ctx 32768` — context window size
- `PARAMETER top_p 0.9` — nucleus sampling cutoff
- `TEMPLATE """..."""` — chat template override (rarely needed)
- `MESSAGE user "..."`, `MESSAGE assistant "..."` — few-shot examples baked into context

Build any persona with:
```bash
$ ollama create <name> -f Modelfile
$ ollama run <name>
```

### Persona 01 · Product — Steve Jobs
Direct. Simplicity over features. Good for product critiques, pitch-deck review, and "should we even build this?" questions. Will tell you your idea is junk.
```
FROM llama3.1:8b

SYSTEM """You are Steve Jobs. You care about one thing: insanely great products.

Rules:
- Simplicity over features. Subtract before you add.
- Ask piercing questions about who this is for and why it matters.
- Demand taste. Call out mediocrity.
- Short, declarative sentences. No hedging.
- When something is bad, say so."""

PARAMETER temperature 0.7
```

### Persona 02 · Creative — Rick Rubin
Taste as a discipline. Good for creative work — writing, music, visual art. Asks what you're really trying to say. Slow, patient, unafraid of silence.
```
FROM llama3.1:8b

SYSTEM """You are Rick Rubin, the record producer. Your job is to help the artist find what they are really trying to say.

Rules:
- Ask more than you answer. Questions before opinions.
- Point at the feeling, not the technique.
- Name what is fake without meanness.
- Celebrate what is true.
- Short, calm sentences. No filler."""

PARAMETER temperature 0.8
```

### Persona 03 · Research — Skeptical Research Assistant
Show your work. Good for fact-checking, argument-sharpening, and steelmanning. Will refuse to speculate without flagging it.
```
FROM llama3.1:8b

SYSTEM """You are a skeptical research assistant.

Rules:
- Distinguish clearly: what is established, what is contested, what is speculation.
- Flag confidence levels: high, medium, low, unknown.
- When you do not know, say so clearly. Do not invent citations.
- Offer the strongest counterargument before giving your own view.
- Prefer primary sources. Name them when you can."""

PARAMETER temperature 0.3
```

### Persona 04 · Engineering — Terse Code Reviewer
No preamble, no praise. Good for real PR review. Will not say "great start!" It reads the code and ships a list.
```
FROM qwen2.5-coder:7b

SYSTEM """You are a code reviewer. Assume the author is senior and short on time.

Rules:
- No preamble, no praise, no summaries.
- Output a terse bulleted list of issues, grouped: Correctness, Performance, Readability, Security.
- For each issue: file:line if known, then one sentence, then suggested fix.
- If the code is fine, say LGTM and stop.
- Never invent problems to look useful."""

PARAMETER temperature 0.2
```

### Persona 05 · Visual — Mermaid Diagram Only
Outputs diagrams, never prose. Good for system-design chats and flowcharts. Describe what you want; it returns a valid Mermaid diagram block and nothing else.
```
FROM llama3.1:8b

SYSTEM """You output Mermaid diagrams, nothing else.

Rules:
- Every response is a valid Mermaid code block: three backticks, then mermaid, then the diagram, then three backticks.
- No explanatory prose before or after.
- Pick the best Mermaid type (flowchart, sequenceDiagram, stateDiagram, erDiagram, classDiagram) for the request.
- Prefer clear node labels over clever ones.
- If the request is ambiguous, make a reasonable choice and diagram that."""

PARAMETER temperature 0.4
```

### Sharing Modelfiles
A Modelfile is just a text file — drop it in a gist, email it, commit it to a repo. The person on the other end runs `ollama create` with it and gets the exact same persona. The most lightweight way to share AI tools that exists: no API keys, no accounts, no SaaS dependency. You can also publish built models with `ollama push yourname/model-name`.

**Temperature cheat sheet:** 0.0–0.3 for code, extraction, and facts. 0.5–0.7 for general chat. 0.8–1.2 for creative writing and brainstorming. Above 1.5 and the model starts losing coherence.

---

## Deep Dive · Mobile

**AI in your pocket.** On-device LLMs aren't a laptop-only story. Modern phones run small, capable models without a network.

### Why on-device on a phone is interesting
Phones added neural processors years before they had anything to do. Now they do: Gemma 4, Llama 3.2, Phi-3 Mini, and Qwen 2.5 all ship variants designed specifically for mobile hardware. The pitch is the same as on a laptop — privacy, offline, zero per-query cost — with one sharper edge: your phone is always with you. A plane, a subway, a remote trail, a hospital waiting room. The cloud is intermittent there. Your device is not.

**Realistic expectations.** Mobile LLMs are small — usually 1B to 4B parameters. Great at summarization, short Q&A, transcription, image description, and structured tasks. Not a replacement for Claude or GPT on complex reasoning. A competent pocket assistant, not a research companion.

### The apps worth installing

**App 01 · Google — Google AI Edge Gallery**
The reference implementation from the folks making Gemma. Google's open-source showcase app for on-device AI. Download Gemma 4 E2B or E4B right inside the app. Fully offline after the first download, no account required. Feels most like a real product while being fully transparent — source on GitHub.
- AI Chat with Thinking Mode — watch the model's reasoning step by step
- Ask Image — take a photo, ask questions about it (multimodal)
- Audio Scribe — on-device transcription and translation
- Prompt Lab — tune temperature, top-k, test single-turn prompts
- Agent Skills — tool-using agents that can hit Wikipedia, show maps, generate QR codes
- Benchmarks — see tokens/sec on your specific device

*Platform: iOS 17+ / Android 12+ · Free · Open source*

**App 02 · Community — PocketPal AI**
Any GGUF model, right on your phone. Free, open-source, cross-platform. Built on llama.cpp, so anything you'd run on a laptop with Ollama can run in PocketPal — pick from its catalog or sideload a GGUF you already have. The power-user flavor.
- Enable Metal acceleration on iOS (shift work from CPU to GPU) for a dramatic speed jump
- Turn on Flash Attention on capable devices for more
- Make "Pals" — system-prompt personas, exactly like Ollama Modelfiles but in your pocket
- Import your own GGUF from Hugging Face

*Platform: iOS / Android · Free · Open source*

**App 03 · Apple — Apollo AI**
Open-source iOS chat, community-driven. iOS-only, llama.cpp under the hood. More technical than its polish-forward competitors — the "let me tinker" app. Fine control over model parameters on iPhone or iPad.

*Platform: iOS / iPadOS · Free · Open source*

**App 04 · Apple — Haplo AI**
Polished, plug-and-play, across your Apple devices. Slick interface, no account required, runs across iPhone, iPad, and Mac with the same library. Good pick if you want local AI that feels like a real product.

*Platform: iOS / iPadOS / macOS · Free tier + paid · Closed source*

### What to expect, performance-wise

**Works well on mobile:**
- Short Q&A, text rewriting, grammar fixes
- Summarizing a single article or email
- Image description and OCR (with multimodal models like Gemma 3n/4)
- Voice transcription (Audio Scribe, on-device Whisper variants)
- Brainstorming short lists, titles, captions

**Works poorly on mobile:**
- Long documents — context windows are small (often 512–2k tokens)
- Heavy reasoning — the model is 2B, not 200B
- Coding tasks beyond snippets
- Sustained chat — battery and heat will become apparent
- Accurate factual recall on obscure topics

### A pragmatic workflow
AI Edge Gallery as your first install (smooth, reliable, multimodal), then add PocketPal if you want to run your own models or experiment more. Use them for the narrow set of things mobile LLMs are genuinely good at — transcription, photo Q&A, quick rewrites — and let your laptop handle everything else.

**Battery warning.** LLM inference is compute-heavy. Expect noticeable battery drain and phone warmth during long sessions. If your phone gets hot, pause — the OS will throttle, and you'll stop getting good tokens/sec anyway.
