import React, { useEffect, useState } from "react";
import { useBoolean } from "react-hanger";

import { Direction, Image } from "@/types.ts";
import {
  isValidImage,
  usePersistedArray,
  usePersistedString,
} from "@/utils.ts";
import { Crusher } from "@/components/Crusher.tsx";
import { Images } from "@/components/Images.tsx";
import { Settings } from "@/components/Settings.tsx";

const crushDurationSeconds = 2;
const fps = 60;
const CRUSHED_IMAGES_KEY = "crushedImages";
const EMERGING_IMAGE_KEY = "emergingImage";

function App() {
  const crushedImages = usePersistedArray<Image>(CRUSHED_IMAGES_KEY, []);
  const [emergingImage, setEmergingImage] = usePersistedString(
    EMERGING_IMAGE_KEY,
    "",
  );

  const isCrushing = useBoolean(false);

  const hasValidImages =
    isValidImage(emergingImage) &&
    crushedImages.value.length > 0 &&
    crushedImages.value.every((i) => isValidImage(i.url));

  const [imageHeight, setImageHeight] = useState(100);
  const [direction, setDirection] = useState<Direction>("decrease");

  const isCrushed = imageHeight <= 0;
  const isDone = imageHeight >= 100;

  const modifyImage = (direction: Direction) => {
    setImageHeight((h) => {
      const diff = 100 / (crushDurationSeconds * fps);
      return direction === "increase" ? h + diff : h - diff;
    });
  };

  useEffect(() => {
    if (isCrushed && direction === "decrease") {
      setTimeout(() => setDirection("increase"), 500);
    }

    if (isCrushing.value) {
      if (!(isDone && direction === "increase")) {
        const timer = setTimeout(() => {
          modifyImage(direction);
        }, 1000 / fps);
        return () => clearTimeout(timer);
      }
    }

    if (isDone && direction === "increase") {
      isCrushing.setFalse();
    }
  }, [imageHeight, direction, isCrushed, isCrushing.value, isDone]);

  const restart = () => {
    isCrushing.setFalse();
    setDirection("decrease");
    setImageHeight(100);
  };

  const minWidth = 400;
  const imagesWidth = 100 * (crushedImages.value.length + 1);
  const width = Math.max(minWidth, imagesWidth);

  return (
    <div className="root bg-gray-900 h-screen w-screen vertical center">
      <Settings
        crushedImages={crushedImages}
        emergingImage={emergingImage}
        setEmergingImage={setEmergingImage}
        hasValidImages={hasValidImages}
        isCrushing={isCrushing}
        restart={restart}
      />

      <Crusher width={width} />
      <Images
        images={
          direction === "increase"
            ? [{ url: emergingImage, id: "emerging-image" }]
            : crushedImages.value
        }
        imageHeight={imageHeight}
      />
      <div
        className="bg-gray-500 rounded-md h-12"
        style={{ width, maxWidth: "90vw" }}
      />
    </div>
  );
}

export default App;
