import React from "react";
import { ImageManager } from "@/components/ImageManager.tsx";
import { Button } from "@/components/base.tsx";
import { UseArray, UseBoolean } from "react-hanger";
import { Image } from "@/types.ts";
import { MadeBy } from "@/components/MadeBy.tsx";

export const Settings = ({
  crushedImages,
  emergingImage,
  setEmergingImage,
  hasValidImages,
  isCrushing,
  restart,
}: {
  crushedImages: UseArray<Image>;
  emergingImage: string;
  setEmergingImage: (i: string) => void;
  hasValidImages: boolean;
  isCrushing: UseBoolean;
  restart: () => void;
}) => {
  return (
    <div className="absolute p-2 bg-gray-700 rounded-md top-2 vertical space-y-2 left-2">
      <ImageManager
        images={crushedImages}
        emergingImage={emergingImage}
        setEmergingImage={setEmergingImage}
      />
      <div className="horizontal space-x-2">
        <Button disabled={!hasValidImages} onClick={isCrushing.toggle}>
          Toggle crushing
        </Button>
        <Button disabled={!hasValidImages} onClick={restart}>
          Restart
        </Button>
      </div>
      <MadeBy />
      <a
        className="text-gray-400 text-xs"
        href="https://github.com/kitze/apple-crusher"
      >
        source on GitHub
      </a>
    </div>
  );
};
