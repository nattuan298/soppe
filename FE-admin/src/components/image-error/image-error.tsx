import { ImageErrorIcon } from "../icons";
import "./styles.css";

export const ImageError = () => {
  return (
    <div className="img-error flex justify-between items-center">
      <div className="m-auto">
        <ImageErrorIcon />
      </div>
    </div>
  );
};
