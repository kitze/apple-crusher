import React from "react";

export const Crusher = ({ width }: { width: number }) => {
  return (
    <div className="relative">
      <div className="bg-gray-500 rounded-t-md absolute h-[50px] w-[20px] left-[100px] top-[-50px]" />
      <div className="bg-gray-500 rounded-t-md absolute h-[50px] w-[20px] right-[100px] top-[-50px]" />
      <div
        className="bg-gray-500 rounded-md h-12"
        style={{ width, maxWidth: "90vw" }}
      />
    </div>
  );
};
