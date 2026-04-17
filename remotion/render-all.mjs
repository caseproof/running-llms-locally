#!/usr/bin/env node
// Render all 10 slide compositions to videos/slide-XX.mp4
// Uses @remotion/renderer programmatically so we don't re-bundle for each slide.

import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia } from "@remotion/renderer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "videos");
await fs.mkdir(outDir, { recursive: true });

console.log("Bundling …");
const bundleLocation = await bundle({
  entryPoint: path.join(__dirname, "src/index.ts"),
  webpackOverride: (c) => c,
});

const ids = Array.from({ length: 10 }, (_, i) => `slide-${String(i + 1).padStart(2, "0")}`);

for (const id of ids) {
  console.log(`Rendering ${id} …`);
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id,
  });
  const outputLocation = path.join(outDir, `${id}.mp4`);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    concurrency: 4,
    imageFormat: "jpeg",
    jpegQuality: 90,
    chromiumOptions: { gl: "swiftshader" },
  });
  const { size } = await fs.stat(outputLocation);
  console.log(`  → ${outputLocation}  (${(size / 1024 / 1024).toFixed(1)} MB)`);
}

console.log("All 10 rendered.");
