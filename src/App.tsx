import { useEffect, useState } from "react";
import { UseArray, useArray } from "react-hanger";
import { twMerge } from "tw-merge";
import clsx, { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const Crusher = () => {
  return (
    <div className="relative">
      <div className="bg-gray-500 rounded-t-md absolute h-[50px] w-[20px] left-[100px] top-[-50px]" />
      <div className="bg-gray-500 rounded-t-md absolute h-[50px] w-[20px] right-[100px] top-[-50px]" />
      <div className="bg-gray-500 rounded-md w-80 h-12" />
    </div>
  );
};

const Images = ({
  images,
  imageHeight,
}: {
  images: string[];
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
        <img
          src={i}
          key={i}
          style={{
            height: "100%",
          }}
        />
      ))}
    </div>
  );
};

type Direction = "increase" | "decrease";

const Button = ({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={cn("bg-gray-400 text-white p-2 rounded-md text-xs", {
        "cursor-not-allowed opacity-20": disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e) => void;
}) => {
  return (
    <input
      className="bg-gray-500 text-xs p-2 rounded-md"
      placeholder="Image URL here..."
      value={value}
      onChange={onChange}
    />
  );
};

const ImageManager = ({
  images,
  emergingImage,
  setEmergingImage,
}: {
  images: UseArray<Image>;
  emergingImage: string;
  setEmergingImage: (i: string) => void;
}) => {
  return (
    <div className="vertical p-2 bg-gray-700 rounded-md space-y-5 text-white">
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
            <div className="horizontal center space-x-2" key={i}>
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

type Image = {
  id: string;
  url: string;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const isValidImage = (i: string) => i && i.trim().length > 0 && isValidUrl(i);

const crushDurationSeconds = 2;
const fps = 60;

function App() {
  const crushedImages = useArray<Image>([]);
  const [emergingImage, setEmergingImage] = useState("");

  const hasValidImages =
    isValidImage(emergingImage) &&
    crushedImages.value.length > 0 &&
    crushedImages.value.every((i) => isValidImage(i.url));

  const [imageHeight, setImageHeight] = useState(100);
  const [isCrushing, setIsCrushing] = useState(false);
  const [direction, setDirection] = useState<Direction>("decrease");

  const isCrushed = imageHeight <= 0;
  const isDone = imageHeight >= 100;

  //reduce according to duration and fps
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

    if (isCrushing) {
      if (!(isDone && direction === "increase")) {
        const timer = setTimeout(() => {
          modifyImage(direction);
        }, 1000 / fps);
        return () => clearTimeout(timer);
      }
    }

    if (isDone && direction === "increase") {
      setIsCrushing(false);
    }
  }, [imageHeight, direction, isCrushed, isCrushing, isDone]);

  const restart = () => {
    setIsCrushing(false);
    setDirection("decrease");
    setImageHeight(100);
  };

  return (
    <div className="root bg-gray-900 h-screen w-screen vertical center">
      <div className="absolute top-2 vertical space-y-2 left-2">
        <div className="text-gray-400 text-xs">
          made with 😡 by{" "}
          <a href="https://twitter.com/thekitze" target="_blank">
            @thekitze
          </a>
        </div>
        <ImageManager
          images={crushedImages}
          emergingImage={emergingImage}
          setEmergingImage={setEmergingImage}
        />
        <div className="horizontal space-x-2">
          <Button
            disabled={!hasValidImages}
            onClick={() => setIsCrushing((c) => !c)}
          >
            Toggle crushing
          </Button>
          <Button disabled={!hasValidImages} onClick={restart}>
            Restart
          </Button>
        </div>
      </div>

      <Crusher />
      <Images
        images={
          direction === "increase"
            ? [emergingImage]
            : crushedImages.value.map((i) => i.url)
        }
        imageHeight={imageHeight}
      />
      <div className="bg-gray-500 rounded-md h-12 w-80" />
    </div>
  );
}

export default App;
