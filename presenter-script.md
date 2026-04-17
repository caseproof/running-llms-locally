# Presenter Script — Running LLMs on Your Own Machine

> Spoken version for the 10 main slides. Short sentences, conversational pacing, ~45–60 seconds per slide (~9 minutes total). Read it as-is or use it as scaffolding.

---

## Slide 1 — Title

Hey everyone. In the next nine minutes, I want to show you something most people don't realize is possible: you can run a capable AI model directly on your own laptop. No cloud. No API key. No monthly bill.

We'll look at three tools that dominate this space — GPT4All, LM Studio, and Ollama. They're all free. They all run the same open model format. And by the end of this, you'll know which one to install tonight, and which model to pair it with.

Let's get into it.

---

## Slide 2 — Why run local?

So first — why bother? Four reasons.

**Privacy.** Nothing you type leaves your device. Not OpenAI, not Anthropic, nobody logs it.

**Cost.** Once the model is downloaded, inference is free. No per-token fees.

**Offline.** Works on a plane, in a basement, on a train through a tunnel. The model lives on your disk.

**Control.** You can swap models, tune prompts, build private assistants that know your work.

Now — the tradeoff is honest. Local models are slower than GPT-5, and they're not as smart. But for summarizing, drafting, answering questions about your own notes — they're more than enough.

---

## Slide 3 — The three tools

There are three tools worth knowing about. Think of them less as rivals and more as siblings — each for a different kind of person.

**GPT4All** is the friendliest. It looks like a chat app. Great for the friend who has never touched a terminal.

**LM Studio** is the explorer's toolkit. Every knob is exposed. It has a built-in Hugging Face browser, and it's noticeably faster on Apple Silicon.

**Ollama** is the developer's foundation. A tiny command-line tool, a background daemon, and an API that speaks OpenAI.

All three are free. All three run the same format — GGUF. Download a model once, and any of them can load it.

---

## Slide 4 — Choose by your device

Before you pick a tool, take stock of your hardware.

If you're on **Apple Silicon** — an M1, M2, M3, or M4 — you're in great shape. Any of the three will work, but LM Studio pulls ahead by about 30% thanks to something called MLX.

If you're on an **Intel Mac** or an older laptop — skip the MLX conversation. Grab GPT4All or Ollama.

On **Windows or Linux** — all three run fine. Ollama leads for headless server use.

Now, match RAM to model size. Eight gigs wants a 3B model. Sixteen gigs is the sweet spot — 7B or 8B models run beautifully. Thirty-two handles 13B. And bigger isn't smarter for what you're doing — it's just slower.

---

## Slide 5 — GPT4All

If you've never run a model locally, start here.

GPT4All is the tool I'd hand to a non-technical friend without a single warning label. You install it. You pick a model from a short curated list. You start typing. No terminal. No config file. No decision paralysis.

The real gift — and this is what hooks people — is **LocalDocs**. Point it at a folder. Your Obsidian vault, a stack of PDFs, a bunch of exported Notion pages — and that folder becomes retrieval context. The model can answer questions about your actual documents. Private, offline, with sources cited at the bottom of every answer.

Start here. You can always graduate to LM Studio or Ollama later.

---

## Slide 6 — LM Studio

LM Studio is the opposite philosophy. Where GPT4All hides complexity, LM Studio surfaces it. Every parameter is a visible knob.

You can browse Hugging Face without leaving the app. You set per-chat system prompts, temperature, context length, quantization. You flip on MLX and watch the tokens-per-second jump. You can even run it in **server mode** — a local OpenAI-compatible endpoint that any client in your ecosystem can hit.

And when you want to automate things, there's a CLI called `lms`.

The tradeoff is real: more surface area means more to learn. If you're brand new, it can feel like a cockpit. But that's the point.

---

## Slide 7 — Ollama

Three commands. That's Ollama.

```
brew install ollama
ollama pull llama3.1:8b
ollama run llama3.1:8b
```

That's it. You're chatting with a local model.

Ollama runs as a background daemon — no window to babysit. But here's the thing that makes it special: it exposes an OpenAI-compatible API at `localhost:11434`. That means any app that speaks ChatGPT can instead speak to your machine.

Open WebUI. Chatbox. Msty. Obsidian plugins. Your own Python script. Same daemon, many clients.

Point an existing OpenAI SDK at that base URL, pass any non-empty API key, and your entire codebase runs locally. Two lines changed. Zero vendor lock-in.

---

## Slide 8 — The Ollama power move

Here's something that surprises people.

The Ollama Mac app has **no system-prompt field**. At first that seems limiting. It isn't. It's an invitation.

You write a tiny text file — a **Modelfile** — that declares a base model and a personality. Like this:

```
FROM llama3.1:8b
SYSTEM "You are Steve Jobs. Simplicity over features."
```

Then one command: `ollama create steve-jobs`. Now every client on your machine sees "steve-jobs" in its model dropdown.

The persona is portable. Shareable. Version-controllable. You can email a Modelfile to a friend and they run one command and get the same character. No API keys. No accounts. It's the lightest-weight way to ship an AI tool that has ever existed.

---

## Slide 9 — Obsidian

A local model only knows what it was trained on. Your Obsidian vault knows what you know. Connect the two, and everything changes.

There are three ways to do it.

The **Copilot plugin** puts a chat sidebar right inside your vault, pointed at your local Ollama. Zero cloud calls.

**Smart Connections** embeds every note into a local vector database, so the model retrieves the most relevant pages before it answers.

And **Ollama MCP** turns your whole vault into a live context source that any MCP-aware client can query on demand.

One gotcha that'll save you an afternoon — set `OLLAMA_ORIGINS` to `app://obsidian.md` before you start the daemon, or it won't connect.

Your notes are the brain. The LLM is the mouth.

---

## Slide 10 — Where to begin

That's the tour. Let me strip this down to a decision.

Never tried local AI? — install **GPT4All** tonight. Start with LocalDocs.

On Apple Silicon and want every knob? — **LM Studio**.

Developer, want a foundation to build on? — **Ollama**.

And honestly — you don't have to choose. Install all three. They share the same GGUF files, so your downloads aren't locked to any one tool.

The links are on the screen: gpt4all.io, lmstudio.ai, ollama.com, huggingface.co for models, and canirun.ai if you want to check whether a specific model will run on your machine.

Pick one. Install it in the next ten minutes. Go make your laptop a little smarter.

Thanks everyone.
