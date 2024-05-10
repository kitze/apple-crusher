import { UseArray } from "react-hanger";
import { Image } from "@/types.ts";
import React from "react";
import { Button, Input } from "@/components/base.tsx";

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
        <div className="text-xs">Emerging image</div>
        <Input
          value={emergingImage}
          onChange={(e) => setEmergingImage(e.target.value)}
        />
      </div>

      <div className="vertical space-y-2">
        <div className="horizontal center-v space-x-2">
          <div className="text-xs">Crushed images</div>
          <Button
            onClick={() => {
              images.push({
                id: Math.random().toString(),
                url: "",
              });
            }}
          >
            +
          </Button>
        </div>

        <div className="vertical center space-y-2">
          {images.value.map((i) => (
            <div className="horizontal center space-x-2" key={i.id}>
              <Input
                value={i.url}
                onChange={(e) => {
                  const newImages = images.value.map((im) =>
                    im.id === i.id
                      ? {
                          ...im,
                          url: e.target.value,
                        }
                      : im,
                  );
                  images.setValue(newImages);
                }}
              />
              <button
                className="text-xs"
                onClick={() => images.removeById(i.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
