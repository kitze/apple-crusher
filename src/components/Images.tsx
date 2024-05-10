import React from "react";
import { Image } from "@/types.ts";

export const Images = ({
  images,
  imageHeight,
}: {
  images: Image[];
  imageHeight: number;
}) => {
  return (
    <div
      className="horizontal center space-x-2"
      style={{
        height: imageHeight,
        maxHeight: imageHeight,
      }}
    >
      {images.map((i) => (
        <img key={i.id} src={i.url} className="h-full" />
      ))}
    </div>
  );
};
