import { ComponentPropsWithRef, MouseEvent, useMemo } from "react";
import { RemoveIcon } from "src/components/icons";
import { SortableHandle } from "react-sortable-hoc";

import "./styles.css";
import { Media, MediaObject } from "./types";
import clsx from "clsx";
interface ImageVideoProps extends ComponentPropsWithRef<"div"> {
  item?: Media | MediaObject;
  handleRemove?: (id: string) => void;
  imgClass?: string;
  removeIconClass?: string;
}

export function ImageVideo({
  item,
  handleRemove,
  removeIconClass,
  imgClass,
  className,
  ...props
}: ImageVideoProps) {
  const handleRemoveItem = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (item?._id && handleRemove) {
      handleRemove(item?._id);
    }
  };

  const Preview = useMemo(() => {
    if (!item) return () => <></>;
    if (item.fileType?.includes("VIDEO")) {
      return SortableHandle(() => (
        <video controls>
          <source type="video/webm" src={`${item.urlPreSign}`} />
          <source type="video/mp4" src={`${item.urlPreSign}`} />
        </video>
      ));
    }
    return SortableHandle(() => (
      <img alt="loi" src={`${item.urlPreSign}`} className="object-cover" />
    ));
  }, [item]);
  return (
    <div className={clsx("item relative flex justify-center", className)} {...props}>
      {<Preview />}
      <div
        className={clsx("absolute icon-remove", removeIconClass)}
        role="button"
        onClick={handleRemoveItem}
      >
        <RemoveIcon />
      </div>
    </div>
  );
}
