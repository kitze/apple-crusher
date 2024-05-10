import { UseArray } from "react-hanger";
import { Image } from "@/types.ts";
import React from "react";
import { ImageManagerImage } from "@/components/ImageManagerImage.tsx";
import { Button, Input } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";

export const ImageManager = ({
  images,
  emergingImage,
  setEmergingImage,
}: {
  images: UseArray<Image>;
  emergingImage: string;
  setEmergingImage: (i: string) => void;
}) => {
  return (
    <div className="vertical space-y-5 text-white">
      <div className="vertical space-y-2">
        <div className="text-sm">Emerging image</div>
        <Input
          size="sm"
          value={emergingImage}
          onChange={(e) => setEmergingImage(e.target.value)}
        />
      </div>

      <div className="vertical space-y-2">
        <div className="horizontal center-v space-x-2">
          <div className="text-sm">Crushed images</div>
          <Button
            size="sm"
            isIconOnly={true}
            onClick={() => {
              images.push({
                id: Math.random().toString(),
                url: "",
              });
            }}
          >
            <IconPlus size={15} />
          </Button>
        </div>

        <div className="vertical center space-y-2">
          {images.value.map((i) => (
            <ImageManagerImage key={i.id} images={images} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
