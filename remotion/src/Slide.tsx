import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import type { Slide as SlideType } from "./slides";
import { WesTemplate } from "./templates/WesTemplate";
import { FincherTemplate } from "./templates/FincherTemplate";

export const Slide: React.FC<{ slide: SlideType }> = ({ slide }) => {
  const Template = slide.director === "wes" ? WesTemplate : FincherTemplate;
  return (
    <AbsoluteFill>
      <Template slide={slide} />
      <Audio src={staticFile(slide.audio)} />
    </AbsoluteFill>
  );
};
