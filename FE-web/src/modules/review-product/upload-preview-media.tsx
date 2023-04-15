import { v4 as uuidv4 } from "uuid";
import arrayMove from "array-move";
import { UploadMedia } from "src/components/upload-image-video/upload-media";
import { SortEnd, SortableContainer, SortableElement } from "react-sortable-hoc";
import List from "@material-ui/core/List";
import { ReactNode, useMemo } from "react";
import { Medias } from "./types";
import { ItemImage } from "./item-image";
import useTranslation from "next-translate/useTranslation";
import styles from "./review-product.module.css";
import { FileObject } from "material-ui-dropzone";

interface PropsSortTable {
  children: ReactNode | ReactNode[];
}

const SortComponent = SortableContainer(({ children }: PropsSortTable) => (
  <List component="div" className={`${styles.showItemImage} grid grid-cols-2 sm:grid-cols-4 gap-3`}>
    {children}
  </List>
));

interface UploadPreviewMediaProps {
  newMedias: Medias[];
  setNewMedias: (oldsMedias: Medias[]) => void;
}

export function UploadPreviewMedia({ newMedias, setNewMedias }: UploadPreviewMediaProps) {
  const { t } = useTranslation("common");

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const newArray = arrayMove(newMedias, oldIndex, newIndex);
    const nNMedias = newArray.reduce((s: Medias[], item: Medias, index: number) => {
      const newItem = { ...item, position: index + 1 };
      if (!item?.url) {
        return [...s, newItem];
      }
      return s;
    }, []);

    setNewMedias(nNMedias);
  };

  const fileLimit = useMemo(() => 5 - newMedias.length, [newMedias]);

  const handleRemoveNewMedia = (id: string) => {
    const deleteMedia = newMedias.find((item) => item._id === id);
    if (!deleteMedia) {
      return;
    }
    const medias = newMedias.filter((item) => item._id !== id);
    const nNMedias = medias.map((item) => {
      if (item && item.position && deleteMedia.position && item.position > deleteMedia.position) {
        return { ...item, position: item.position - 1 };
      }
      return item;
    });
    setNewMedias(nNMedias);
  };

  const SortableItem = SortableElement((item: Medias) => {
    return <ItemImage item={item} handleRemove={handleRemoveNewMedia} />;
  });

  const addNewMedias = (files: FileObject[]) => {
    const addMedias = files.map((item, idx) => ({
      _id: uuidv4(),
      urlPreSign: item.data,
      fileType: "IMAGE",
      position: newMedias.length + idx + 1,
      url: "",
      ...item,
    }));
    setNewMedias([...newMedias, ...addMedias]);
  };

  return (
    <div className="">
      <div>
        {newMedias.length < 1 && <UploadMedia name={t`upload-the-image`} addNewMedias={addNewMedias} fileLimit={1} />}
      </div>
      <SortComponent onSortEnd={onSortEnd} axis="xy" useDragHandle>
        {newMedias.map((item: Medias, index: number) => (
          <SortableItem key={item._id} index={index} {...item} />
        ))}
      </SortComponent>
    </div>
  );
}
