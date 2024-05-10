import React from "react";
import { Input } from "@/components/base.tsx";
import { Image } from "@/types.ts";
import { UseArray } from "react-hanger";

export const ImageManagerImage = ({
  i,
  images,
}: {
  i: Image;
  images: UseArray<Image>;
}) => {
  return (
    <div className="horizontal center space-x-2">
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
      <label
        htmlFor="file-upload"
        className="cursor-pointer text-xl bg-transparent hover:bg-gray-100 p-2 rounded"
        title="Upload image"
      >
        🖼️
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const newImages = images.value.map((im) =>
                im.id === i.id
                  ? { ...im, url: e.target.result.toString() }
                  : im,
              );
              images.setValue(newImages);
            };
            reader.readAsDataURL(file);
          }
        }}
      />

      <button className="text-xs" onClick={() => images.removeById(i.id)}>
        🗑️
      </button>
    </div>
  );
};
