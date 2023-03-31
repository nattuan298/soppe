import { MouseEvent, useMemo } from "react";
import { SortableHandle } from "react-sortable-hoc";
import { RemoveIcon } from "src/components/svgs";

import styles from "./review-product.module.css";
import { Medias } from "./types";
interface ImageVideoProps {
  item: Medias;
  handleRemove: (id: string) => void;
}

export function ItemImage({ item, handleRemove, ...props }: ImageVideoProps) {
  const handleRemoveItem = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (item._id && handleRemove) {
      handleRemove(item._id);
    }
  };

  const Preview = useMemo(() => {
    return SortableHandle(() => <img alt="loi" src={`${item.data}`} />);
  }, [item]);

  return (
    <div>
      <div className="item-drag relative flex justify-center" {...props}>
        <Preview />
        <div className={`absolute ${styles.iconRemove}`} role="button" onClick={handleRemoveItem}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
}
