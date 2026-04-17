# Speaker Notes — Running LLMs on Your Own Machine

---

## Slide 1 · Title

Three tools. One model format. Zero cloud.

GPT4All · LM Studio · Ollama — all free, all run GGUF.

---

## Slide 2 · The case for local

- **Privacy** — nothing leaves the device. No logging.
- **Cost** — download once, inference is free.
- **Offline** — plane, basement, no signal. Doesn't matter.
- **Control** — swap models, build private assistants.

Tradeoff: slower, less capable than frontier. For summarizing, drafting, Q&A — plenty good.

---

## Slide 3 · The cast of characters

| Tool | For | URL |
|------|-----|-----|
| GPT4All | beginners, non-technical | gpt4all.io |
| LM Studio | power users, explorers | lmstudio.ai |
| Ollama | developers, scripters | ollama.com |

All free. All GGUF. Models are interchangeable between them.

---

## Slide 4 · Choose by your device

- **Apple Silicon (M1–M4):** any of the three. LM Studio ~30% faster via MLX.
- **Intel Mac / older:** GPT4All or Ollama. MLX advantage gone.
- **Windows / Linux:** all three. Ollama leads headless; LM Studio leads desktop.

### RAM → model size

| RAM | Model |
|-----|-------|
| 8 GB | 3B — Phi, Gemma 2B/3B |
| 16 GB | 7–8B — Llama 3.1 8B, Mistral 7B (sweet spot) |
| 32 GB | 13B comfortable; 70B quantized |
| 64 GB+ | 70B at good quality |

More params = smarter, slower. Don't need 70B to summarize notes.

---

## Slide 5 · GPT4All

Install → pick model → chat. No terminal.

**LocalDocs** is the reason to use it: drop a folder, it becomes RAG context. Private. Zero setup. Cites sources.

Graduate to LM Studio or Ollama later — no lock-in.

---

## Slide 6 · LM Studio

Where GPT4All hides complexity, LM Studio surfaces it.

- Browse Hugging Face without leaving the app
- MLX backend on Apple Silicon (noticeably faster)
- Per-chat: system prompt, temperature, context length, quantization
- Local server mode: OpenAI-compatible API
- `lms` CLI for scripting

Tradeoff: more surface area. Overwhelming if brand new.

---

## Slide 7 · Ollama

```bash
brew install ollama
ollama pull llama3.1:8b
ollama run llama3.1:8b
```

Inside the REPL: `/?` lists commands. `/bye` exits.

- Runs as background daemon — no window to babysit
- OpenAI-compatible API at `localhost:11434`
- Any app that speaks ChatGPT can speak to Ollama

One daemon, many clients: Open WebUI, Chatbox, Obsidian plugins, your own scripts — all share the same instance.

---

## Slide 8 · Ollama power move — Modelfile

```
FROM gemma3:4b

SYSTEM """You are Steve Jobs. Direct.
Simplicity over features. Ask piercing
questions. Demand insanely great."""
```

```bash
ollama create steve-jobs -f Modelfile
ollama run steve-jobs
```

Build → appears in every client's model dropdown. Portable. Share as a text file.

---

## Slide 9 · Obsidian

Your notes become the AI's memory.

- **Copilot plugin** — chat sidebar, points at local Ollama/LM Studio. No cloud.
- **Smart Connections** — embeds every note into local vector DB, retrieves relevant pages before answering.
- **Ollama MCP** — vault as live context for any MCP-aware client.

Your notes are the brain. The LLM is the mouth.

CORS gotcha: set `OLLAMA_ORIGINS=app://obsidian.md*` before starting Ollama. Most common reason it won't connect.

---

## Slide 10 · Pick your starting point

- Never tried local AI? → **GPT4All**
- Apple Silicon, want it all? → **LM Studio**
- Developer who wants flexibility? → **Ollama**

Install all three if you want — GGUF downloads work in any.

**Links:**
- gpt4all.io
- lmstudio.ai
- ollama.com
- huggingface.co/models

---

# Deep Dives

---

## Deep Dive · LocalDocs (GPT4All)

RAG over your own files. No cloud. No account. Cites sources.

**Setup:**
1. Install GPT4All, download a chat model
2. LocalDocs → Add Collection → point at a folder
3. Download embedding model (~137 MB, one-time)
4. New chat → toggle collection on → ask

**Works well:** markdown, real-text PDFs, focused questions, stable content

**Struggles:** scanned PDFs, huge codebases, vague questions, fast-changing content

**Tips:**
- Narrow collections beat one giant dump — retrieval is easier
- If citations are wrong, rephrase with more specific terms
- Fragmented answers = retrieval problem, not model problem

---

## Deep Dive · Obsidian

**The stack:** Obsidian + Ollama + chat model + embedding model. Glue = Copilot plugin (Logan Yang).

**Pull both models first:**
```bash
ollama pull llama3.1:8b
ollama pull nomic-embed-text
```

**CORS fix — do this before anything else:**
```bash
OLLAMA_ORIGINS=app://obsidian.md* ollama serve
```
macOS permanent: `launchctl setenv OLLAMA_ORIGINS "app://obsidian.md*"` then restart Ollama app.

**Copilot setup:** model name must match `ollama list` exactly. Provider: Ollama. Base URL: `http://localhost:11434`.

**If answers get cut off:** bake in `num_ctx 32768` — run model, `/set parameter num_ctx 32768`, `/save`.

**Troubleshoot:** can't connect → check CORS first. Run `curl localhost:11434` — should say "Ollama is running."

---

## Deep Dive · Ollama API

Base URL: `http://localhost:11434/v1` — OpenAI-compatible. API key = any non-empty string.

**Two-line swap** (existing OpenAI code):
```python
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)
```

**Embeddings model:** `nomic-embed-text` → 768-dim vectors.

**Tool calling:** works on Llama 3.1, Qwen 2.5, Mistral. Unreliable on models under 7B. Check for `None` on `tool_calls`.

**CORS from browser apps:** set `OLLAMA_ORIGINS` to your app's origin before starting Ollama.

**Common failures:**
- Connection refused → Ollama isn't running (`ollama serve`)
- Model not found → `ollama pull <model>`
- Answers cut off → bigger `num_ctx`

**Open WebUI in 3 commands:**
```bash
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui --restart always \
  ghcr.io/open-webui/open-webui:main
```
Visit `localhost:3000`.

---

## Deep Dive · Modelfile

```
FROM <model>
SYSTEM """..."""
PARAMETER temperature 0.7
PARAMETER num_ctx 32768
```

```bash
ollama create <name> -f Modelfile
ollama run <name>
```

**Temperature cheat sheet:**
- 0.0–0.3 → code, facts, extraction
- 0.5–0.7 → general chat
- 0.8–1.2 → creative, brainstorming
- 1.5+ → incoherent

**Ready personas (base: llama3.1:8b unless noted):**
- Steve Jobs — product critique, temp 0.7
- Rick Rubin — creative work, temp 0.8
- Skeptical Researcher — fact-checking, temp 0.3
- Code Reviewer — base: qwen2.5-coder:7b, temp 0.2
- Mermaid Only — diagrams, no prose, temp 0.4

Share as text file. Other person runs `ollama create`. No keys, no accounts.

---

## Deep Dive · Mobile

1B–4B models. Great for: short Q&A, summarizing one article, image description, transcription, rewrites.

Not for: long docs, hard reasoning, heavy coding, accurate obscure facts.

**Apps:**
- **AI Edge Gallery** (Google) — Gemma on-device, multimodal, thinking mode, benchmarks. iOS 17+ / Android 12+. Free, open source. Best first install.
- **PocketPal AI** — any GGUF, Metal acceleration on iOS, personas like Modelfiles. Free, open source.
- **Apollo AI** — iOS/iPadOS, technical, open source.
- **Haplo AI** — polished, Apple ecosystem, free tier + paid.

**Workflow:** AI Edge Gallery first. Add PocketPal if you want your own models.

**Battery warning:** LLM inference is hot and heavy. Phone throttles under load — you'll feel it.
