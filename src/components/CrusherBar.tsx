import React from "react";

export const CrusherBar = ({ width }: { width: number }) => {
  return (
    <div
      className="bg-gray-500 rounded-md h-12 transition-width duration-300"
      style={{ width, maxWidth: "90vw" }}
    />
  );
};
