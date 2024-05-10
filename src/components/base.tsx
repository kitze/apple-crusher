import { cn } from "@/utils";

export const Input = ({
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

export const Button = ({
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
