import React from "react";
import { Image } from "@/types.ts";
import { UseArray } from "react-hanger";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { IconFolder, IconTrash } from "@tabler/icons-react";

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
        size="sm"
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
      <Tooltip content="Choose local image">
        <Button
          as="label"
          htmlFor="file-upload"
          title="Upload image"
          isIconOnly={true}
          size="sm"
        >
          <IconFolder size={15} />
        </Button>
      </Tooltip>
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

      <Tooltip content="Remove image">
        <Button
          isIconOnly={true}
          size="sm"
          className="text-xs"
          onClick={() => images.removeById(i.id)}
        >
          <IconTrash size={13} />
        </Button>
      </Tooltip>
    </div>
  );
};
