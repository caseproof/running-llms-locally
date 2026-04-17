export type Director = "wes" | "fincher";

export type Slide = {
  id: string;
  index: number;
  director: Director;
  kicker: string;
  title: string;
  subtitle?: string;
  beats: string[];
  tagline?: string;
  audio: string;
  durationSec: number;
};

export const FPS = 30;
export const DEFAULT_DURATION_SEC = 50;

// Per-slide durations sized to TTS audio + ~2s tail for the fade-out.
const DUR: Record<string, number> = {
  "slide-01": 36,
  "slide-02": 36,
  "slide-03": 36,
  "slide-04": 38,
  "slide-05": 36,
  "slide-06": 38,
  "slide-07": 46,
  "slide-08": 39,
  "slide-09": 41,
  "slide-10": 39,
};

export const slides: Slide[] = [
  {
    id: "slide-01",
    index: 1,
    director: "wes",
    kicker: "Issue 01 · A nine-minute tour",
    title: "Running LLMs on your own machine.",
    subtitle: "Three tools. One open model format. Zero cloud.",
    beats: ["GPT4All", "LM Studio", "Ollama"],
    tagline: "Est. 9 min · 10 slides",
    audio: "audio/slide-01.mp3",
    durationSec: 36,
  },
  {
    id: "slide-02",
    index: 2,
    director: "fincher",
    kicker: "02 · The case for local",
    title: "Why bother running models locally?",
    beats: [
      "PRIVACY — your data never leaves the device",
      "COST — inference is free after download",
      "OFFLINE — works on a plane, in a basement",
      "CONTROL — swap models, tune prompts, own the stack",
    ],
    tagline: "0 packets sent to cloud",
    audio: "audio/slide-02.mp3",
    durationSec: 36,
  },
  {
    id: "slide-03",
    index: 3,
    director: "wes",
    kicker: "03 · The cast of characters",
    title: "Three tools dominate the local-LLM space.",
    beats: [
      "01 EASIEST — GPT4All — friendly desktop app",
      "02 EXPLORER — LM Studio — every knob exposed",
      "03 DEVELOPER — Ollama — CLI + daemon",
    ],
    tagline: "All free. All GGUF. All share models.",
    audio: "audio/slide-03.mp3",
    durationSec: 36,
  },
  {
    id: "slide-04",
    index: 4,
    director: "fincher",
    kicker: "04 · Choose by your device",
    title: "Match the tool to your hardware.",
    beats: [
      "Apple Silicon — any of the three · LM Studio ~30% faster w/ MLX",
      "Intel Mac / older — GPT4All or Ollama",
      "Win / Linux — all three · Ollama leads headless",
      "8 GB → 3B · 16 GB → 7–8B · 32 GB → 13B · 64 GB+ → 70B",
    ],
    tagline: "Bigger isn't smarter. It's slower.",
    audio: "audio/slide-04.mp3",
    durationSec: 38,
  },
  {
    id: "slide-05",
    index: 5,
    director: "wes",
    kicker: "05 · Tool 01 · The softest landing",
    title: "GPT4All — the friendliest front door.",
    beats: [
      "Looks like a normal chat app — no CLI",
      "Curated model list — no decision paralysis",
      "LocalDocs — private RAG over your folders",
      "Sources cited at the bottom of every answer",
    ],
    tagline: "Start here. Graduate later.",
    audio: "audio/slide-05.mp3",
    durationSec: 36,
  },
  {
    id: "slide-06",
    index: 6,
    director: "fincher",
    kicker: "06 · Tool 02 · Power-user toolkit",
    title: "LM Studio — every knob surfaced.",
    beats: [
      "Browse Hugging Face inside the app",
      "Per-chat system prompt · temp · ctx · quant",
      "MLX backend on Apple Silicon",
      "Local server mode · OpenAI-compatible",
      "lms CLI for scripting",
    ],
    tagline: "A cockpit, on purpose.",
    audio: "audio/slide-06.mp3",
    durationSec: 38,
  },
  {
    id: "slide-07",
    index: 7,
    director: "fincher",
    kicker: "07 · Tool 03 · Developer foundation",
    title: "Ollama — three lines. Install, pull, run.",
    beats: [
      "$ brew install ollama",
      "$ ollama pull llama3.1:8b",
      "$ ollama run llama3.1:8b",
      "OpenAI-compatible API at localhost:11434",
      "One daemon, many clients",
    ],
    tagline: "Two lines changed. Zero vendor.",
    audio: "audio/slide-07.mp3",
    durationSec: 46,
  },
  {
    id: "slide-08",
    index: 8,
    director: "wes",
    kicker: "08 · The Ollama power move",
    title: "Bake personas into the model itself.",
    beats: [
      "FROM llama3.1:8b",
      'SYSTEM "You are Steve Jobs. Simplicity over features."',
      "$ ollama create steve-jobs -f Modelfile",
      "Portable across every client. Shareable.",
    ],
    tagline: "A Modelfile is the lightest AI tool to ship.",
    audio: "audio/slide-08.mp3",
    durationSec: 39,
  },
  {
    id: "slide-09",
    index: 9,
    director: "wes",
    kicker: "09 · Bonus round",
    title: "Obsidian — your notes become the AI's memory.",
    beats: [
      "Copilot plugin — chat sidebar inside your vault",
      "Smart Connections — local vector DB of every note",
      "Ollama MCP — vault as live context source",
      "Gotcha: OLLAMA_ORIGINS=app://obsidian.md*",
    ],
    tagline: "Your notes are the brain. The LLM is the mouth.",
    audio: "audio/slide-09.mp3",
    durationSec: 41,
  },
  {
    id: "slide-10",
    index: 10,
    director: "fincher",
    kicker: "10 · Pick your starting point",
    title: "Where to begin.",
    beats: [
      "Never tried local AI?  →  GPT4All",
      "Apple Silicon, want it all?  →  LM Studio",
      "Developer, want flexibility?  →  Ollama",
      "gpt4all.io · lmstudio.ai · ollama.com · huggingface.co",
    ],
    tagline: "Make your laptop a little smarter.",
    audio: "audio/slide-10.mp3",
    durationSec: 39,
  },
];
