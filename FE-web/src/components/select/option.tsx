import { forwardRef } from "react";

interface OptionProps {
  onSelect: () => void;
  isSeleted?: boolean;
  name: string;
  image?: string;
  showFullHeight?: boolean;
}

const Option = forwardRef<HTMLLIElement, OptionProps>(
  ({ onSelect, isSeleted, name, image, showFullHeight }, ref) => {
    const props = isSeleted ? { ref } : {};
    return (
      <li
        className={`${isSeleted && "text-orange"} ${
          showFullHeight ? "h-auto" : "h-50"
        } hover:text-orange cursor-pointer flex items-center p-3.5`}
        onMouseDown={onSelect}
        {...props}
      >
        {image && <img src={image} alt="img" className="mr-2 w-5 h-5" />}
        {name}
      </li>
    );
  },
);

export default Option;
