import React from "react";
import { Composition } from "remotion";
import { slides, FPS } from "./slides";
import { Slide } from "./Slide";

export const Root: React.FC = () => {
  return (
    <>
      {slides.map((s) => (
        <Composition
          key={s.id}
          id={s.id}
          component={Slide}
          durationInFrames={Math.round(s.durationSec * FPS)}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ slide: s }}
        />
      ))}
    </>
  );
};
