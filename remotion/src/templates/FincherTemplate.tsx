import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Slide } from "../slides";

const bg = "#0a0f0c";
const bg2 = "#0e1a14";
const green = "#9ce3b0";
const greenDim = "#5a8a6d";
const greenBright = "#c6f5d4";
const accent = "#c94828";

export const FincherTemplate: React.FC<{ slide: Slide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const typeProgress = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleChars = Math.floor(slide.title.length * typeProgress);

  const kickerIn = spring({ frame, fps, config: { damping: 22 }, durationInFrames: 16 });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Scanline flicker — subtle
  const flicker = 0.96 + 0.04 * Math.sin(frame * 0.6);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${bg2} 0%, ${bg} 85%)`,
        fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
        color: green,
        opacity: fadeOut * flicker,
      }}
    >
      {/* grid */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, opacity: 0.18 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={greenDim} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* scanlines */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* status bar */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 96,
          right: 96,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: greenDim,
          borderBottom: `1px solid ${greenDim}`,
          paddingBottom: 14,
          opacity: kickerIn,
        }}
      >
        <span>[{slide.kicker}]</span>
        <span>
          <span style={{ color: accent }}>●</span> REC · local · no egress
        </span>
      </div>

      {/* crosshair markers */}
      <div style={{ position: "absolute", top: 128, left: 96, color: greenDim, fontSize: 14 }}>+</div>
      <div style={{ position: "absolute", top: 128, right: 96, color: greenDim, fontSize: 14 }}>+</div>
      <div style={{ position: "absolute", bottom: 128, left: 96, color: greenDim, fontSize: 14 }}>+</div>
      <div style={{ position: "absolute", bottom: 128, right: 96, color: greenDim, fontSize: 14 }}>+</div>

      {/* body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 180px",
        }}
      >
        <div style={{ fontSize: 22, color: greenDim, marginBottom: 24, letterSpacing: "0.18em" }}>
          &gt; exec //slide_{String(slide.index).padStart(2, "0")}
        </div>

        <h1
          style={{
            fontSize: 84,
            lineHeight: 1.08,
            fontWeight: 600,
            color: greenBright,
            margin: 0,
            letterSpacing: "-0.01em",
            maxWidth: 1500,
          }}
        >
          {slide.title.slice(0, titleChars)}
          <span
            style={{
              display: "inline-block",
              width: 18,
              height: 72,
              background: green,
              marginLeft: 8,
              verticalAlign: "middle",
              opacity: Math.floor(frame / 12) % 2 === 0 ? 1 : 0,
            }}
          />
        </h1>

        {/* beats as data rows */}
        <div style={{ marginTop: 56, maxWidth: 1500 }}>
          {slide.beats.map((b, i) => {
            const delay = 70 + i * 14;
            const appear = spring({ frame: frame - delay, fps, config: { damping: 22 }, durationInFrames: 20 });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  padding: "14px 0",
                  borderBottom: `1px dashed ${greenDim}`,
                  fontSize: 26,
                  color: green,
                  opacity: appear,
                  transform: `translateX(${(1 - appear) * -24}px)`,
                }}
              >
                <span style={{ color: accent, fontSize: 20 }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{b}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* tagline strip */}
      {slide.tagline && (
        <div
          style={{
            position: "absolute",
            bottom: 128,
            left: 96,
            right: 96,
            padding: "18px 22px",
            border: `1px solid ${green}`,
            color: greenBright,
            fontSize: 22,
            letterSpacing: "0.1em",
            textAlign: "center",
            opacity: interpolate(frame, [durationInFrames * 0.5, durationInFrames * 0.6], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {slide.tagline}
        </div>
      )}

      {/* footer */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 96,
          right: 96,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          color: greenDim,
          letterSpacing: "0.2em",
          borderTop: `1px solid ${greenDim}`,
          paddingTop: 14,
        }}
      >
        <span>SLIDE {String(slide.index).padStart(2, "0")} / 10</span>
        <span>packets_out = 0</span>
        <span>caseproof.github.io/running-llms-locally</span>
      </div>
    </AbsoluteFill>
  );
};
