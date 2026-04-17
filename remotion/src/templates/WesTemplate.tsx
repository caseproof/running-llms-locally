import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Slide } from "../slides";

const paper = "#ede6d4";
const paper2 = "#e4dcc6";
const ink = "#141210";
const ink2 = "#3a362e";
const muted = "#7a7464";
const rule = "#c7bda3";
const accent = "#c94828";

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.07 0 0 0 0 0.05 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export const WesTemplate: React.FC<{ slide: Slide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const kickerIn = spring({ frame, fps, config: { damping: 18 }, durationInFrames: 20 });
  const titleIn = spring({ frame: frame - 12, fps, config: { damping: 20 }, durationInFrames: 28 });
  const subIn = spring({ frame: frame - 28, fps, config: { damping: 20 }, durationInFrames: 24 });

  const drift = interpolate(frame, [0, durationInFrames], [0, -18]);
  const fadeOut = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: paper, fontFamily: "'Fraunces', ui-serif, Georgia, serif", color: ink, opacity: fadeOut }}>
      {/* paper grain */}
      <AbsoluteFill style={{ backgroundImage: grain, opacity: 0.35, mixBlendMode: "multiply", pointerEvents: "none" }} />

      {/* vignette */}
      <AbsoluteFill style={{ boxShadow: "inset 0 0 400px rgba(60,40,20,0.25)", pointerEvents: "none" }} />

      {/* top hairline + kicker */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 120,
          right: 120,
          borderTop: `1px solid ${rule}`,
          paddingTop: 22,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 20,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: muted,
          opacity: kickerIn,
          transform: `translateY(${(1 - kickerIn) * 12}px)`,
        }}
      >
        <span>{slide.kicker}</span>
        <span>● Local LLMs · a tour</span>
      </div>

      {/* accent bar */}
      <div
        style={{
          position: "absolute",
          top: 132,
          left: "50%",
          width: 88 * titleIn,
          height: 4,
          background: accent,
          transform: "translateX(-50%)",
        }}
      />

      {/* centered stack */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 160px",
          transform: `translateY(${drift}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 96,
            lineHeight: 1.02,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            margin: 0,
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 24}px)`,
            maxWidth: 1400,
          }}
        >
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p
            style={{
              marginTop: 36,
              fontFamily: "'Geist', -apple-system, sans-serif",
              fontSize: 30,
              color: ink2,
              maxWidth: 1100,
              opacity: subIn,
              transform: `translateY(${(1 - subIn) * 16}px)`,
            }}
          >
            {slide.subtitle}
          </p>
        )}

        {slide.beats.length > 0 && (
          <div
            style={{
              marginTop: 64,
              display: "flex",
              gap: 0,
              justifyContent: "center",
              maxWidth: 1500,
              flexWrap: "wrap",
            }}
          >
            {slide.beats.map((b, i) => {
              const delay = 40 + i * 12;
              const appear = spring({ frame: frame - delay, fps, config: { damping: 18 }, durationInFrames: 24 });
              return (
                <div
                  key={i}
                  style={{
                    padding: "18px 34px",
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    fontSize: 26,
                    color: ink2,
                    borderLeft: i === 0 ? "none" : `1px solid ${rule}`,
                    opacity: appear,
                    transform: `translateY(${(1 - appear) * 14}px)`,
                  }}
                >
                  {b}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* tagline foot */}
      {slide.tagline && (
        <div
          style={{
            position: "absolute",
            bottom: 88,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 18,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: accent,
            opacity: interpolate(frame, [durationInFrames * 0.4, durationInFrames * 0.55], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          — {slide.tagline} —
        </div>
      )}

      {/* bottom hairline + index */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 120,
          right: 120,
          borderBottom: `1px solid ${rule}`,
          paddingBottom: 18,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 16,
          letterSpacing: "0.2em",
          color: muted,
        }}
      >
        <span>{String(slide.index).padStart(2, "0")} / 10</span>
        <span>caseproof.github.io/running-llms-locally</span>
      </div>
    </AbsoluteFill>
  );
};
