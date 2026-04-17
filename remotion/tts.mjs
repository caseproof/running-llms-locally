#!/usr/bin/env node
// Generate OpenAI TTS audio for each slide VO script.
// Reads src/scripts/vo-scripts.md, extracts "VO:" lines per slide, writes public/audio/slide-XX.mp3

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

// Load .env.local
const envPath = path.join(repoRoot, ".env.local");
const envText = await fs.readFile(envPath, "utf8");
for (const line of envText.split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY missing in .env.local");
  process.exit(1);
}

const scriptsPath = path.join(__dirname, "src/scripts/vo-scripts.md");
const md = await fs.readFile(scriptsPath, "utf8");

// Parse: sections per slide
const sections = md.split(/^## Slide /m).slice(1);
const voEntries = [];
for (const sec of sections) {
  const indexMatch = sec.match(/^(\d+)\s*—/);
  if (!indexMatch) continue;
  const idx = parseInt(indexMatch[1], 10);
  const voMatch = sec.match(/VO:\s*([\s\S]*?)(?:\n\nVisual cues:|\n---|\n##|$)/);
  if (!voMatch) continue;
  const text = voMatch[1].trim().replace(/\n/g, " ").replace(/\s+/g, " ");
  voEntries.push({ idx, text });
}

console.log(`Parsed ${voEntries.length} VO scripts`);

const outDir = path.join(__dirname, "public/audio");
await fs.mkdir(outDir, { recursive: true });

const VOICE = process.env.OPENAI_TTS_VOICE || "onyx"; // onyx = warm, measured male; alternatives: nova, shimmer, echo, alloy, fable
const MODEL = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";

for (const { idx, text } of voEntries) {
  const outFile = path.join(outDir, `slide-${String(idx).padStart(2, "0")}.mp3`);
  try {
    const stat = await fs.stat(outFile);
    if (stat.size > 0 && !process.env.FORCE) {
      console.log(`  skip slide-${idx} (exists)`);
      continue;
    }
  } catch {}

  process.stdout.write(`  slide-${String(idx).padStart(2, "0")} … `);
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      voice: VOICE,
      input: text,
      response_format: "mp3",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`\nTTS failed for slide ${idx}: ${res.status} ${err}`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(outFile, buf);
  console.log(`${(buf.length / 1024).toFixed(0)} KB ✓`);
}

console.log("Done.");
