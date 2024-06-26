import React from "react";
import { ImageManager } from "@/components/ImageManager.tsx";
import { UseArray, UseBoolean } from "react-hanger";
import { Image } from "@/types.ts";
import { MadeBy } from "@/components/MadeBy.tsx";
import { Button } from "@nextui-org/react";

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
    <div className="absolute p-2 bg-white bg-opacity-5 rounded-md top-2 vertical space-y-2 left-2">
      <ImageManager
        images={crushedImages}
        emergingImage={emergingImage}
        setEmergingImage={setEmergingImage}
      />
      <div className="horizontal space-x-2">
        <Button
          size="sm"
          disabled={!hasValidImages}
          onClick={isCrushing.toggle}
        >
          Toggle crushing
        </Button>
        <Button size="sm" disabled={!hasValidImages} onClick={restart}>
          Restart
        </Button>
      </div>
      <MadeBy />
      <a
        target="_blank"
        className="text-gray-400 text-xs"
        href="https://github.com/kitze/apple-crusher"
      >
        source on GitHub
      </a>
    </div>
  );
};
