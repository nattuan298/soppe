import { ReactNode, useMemo } from "react";
import { FileObject } from "material-ui-dropzone";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { orderBy } from "lodash";
import { SortEnd, SortableContainer, SortableElement } from "react-sortable-hoc";
import List from "@material-ui/core/List";
import arrayMove from "array-move";

import { ImageVideo } from "./image-video";
import { UploadMedia } from "src/components/upload-image-video/upload-media";
import { Media, MediaObject } from "../product-update/types";
import { FileExtension } from "src/types/common.modal";

interface PreviewImageVideoProps {
  oldsMedias: Array<Media>;
  setOldMedias: (oldsMedias: Array<Media>) => void;
  newMedias: Array<MediaObject>;
  setNewMedias: (oldsMedias: Array<MediaObject>) => void;
}
interface PropsSortTable {
  children: ReactNode | ReactNode[];
}

const SortComponent = SortableContainer(({ children }: PropsSortTable) => (
  <List component="div" className="show-image-video grid grid-cols-4 gap-3">
    {children}
  </List>
));

export function UploadPreviewMedia({
  oldsMedias,
  setOldMedias,
  newMedias,
  setNewMedias,
}: PreviewImageVideoProps) {
  const { t } = useTranslation("common");
  const acceptedFiles: FileExtension[] = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];

  const handleRemoveOldMedia = (id: string) => {
    const deletedMedia = oldsMedias.find(({ _id }) => _id === id);
    if (!deletedMedia) {
      return;
    }
    const medias = oldsMedias.filter(({ _id }) => _id !== id);
    const nOMedias = medias.map((item) => {
      if (item.position > deletedMedia?.position) {
        return { ...item, position: item.position - 1 };
      }
      return item;
    });
    const nNMedia = newMedias.map((item) => {
      if (item.position > deletedMedia?.position) {
        return { ...item, position: item.position - 1 };
      }
      return item;
    });
    setOldMedias(nOMedias);
    setNewMedias(nNMedia);
  };

  const handleRemoveNewMedia = (id: string) => {
    const deletedMedia = newMedias.find(({ _id }) => _id === id);
    if (!deletedMedia) {
      return;
    }
    const medias = newMedias.filter(({ _id }) => _id !== id);

    const nOMedias = oldsMedias.map((item) => {
      if (item.position > deletedMedia?.position) {
        return { ...item, position: item.position - 1 };
      }
      return item;
    });
    const nNMedia = medias.map((item) => {
      if (item.position > deletedMedia?.position) {
        return { ...item, position: item.position - 1 };
      }
      return item;
    });
    setOldMedias(nOMedias);
    setNewMedias(nNMedia);
  };

  const addNewMedias = (files: Array<FileObject>) => {
    const index = newMedias.length + oldsMedias.length;
    const addMedias = files.map((item, idx) => ({
      _id: uuidv4(),
      urlPreSign: item.data,
      fileType: item.file.type.includes("video") ? "VIDEO" : "IMAGE",
      position: index + idx + 1,
      ...item,
    }));
    setNewMedias([...newMedias, ...addMedias]);
  };

  const countVideo = useMemo(() => {
    const countMediaOld = oldsMedias.filter((item) => item.fileType.includes("VIDEO")).length;
    const countMediaNew = newMedias.filter((item) => item.file.type.includes("VIDEO")).length;
    return countMediaOld + countMediaNew;
  }, [oldsMedias, newMedias]);

  const fileLimit = useMemo(
    () => 10 - oldsMedias.length - newMedias.length,
    [oldsMedias, newMedias],
  );

  const listUpload = useMemo(
    () => orderBy([...newMedias, ...oldsMedias], ["position"], ["asc"]),
    [newMedias, oldsMedias],
  );

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const newArray = arrayMove(listUpload, oldIndex, newIndex);
    const nNMedias = newArray.reduce((s: any, item: any, index: number) => {
      const newItem = { ...item, position: index + 1 };
      if (!item?.url) {
        return [...s, newItem];
      }
      return s;
    }, []);
    const nOMedias = newArray.reduce((s: any, item: any, index: number) => {
      const newItem = { ...item, position: index + 1 };
      if (item?.url) {
        return [...s, newItem];
      }
      return s;
    }, []);
    setNewMedias(nNMedias);
    setOldMedias(nOMedias);
  };

  const SortableItem = SortableElement((item: Media | MediaObject) => {
    if (item?.url) {
      return <ImageVideo item={item} handleRemove={handleRemoveOldMedia} />;
    }
    return <ImageVideo item={item} handleRemove={handleRemoveNewMedia} />;
  });

  return (
    <div className="pl-1">
      <label>
        <span className="text-base txt-style-medium">{t`upload-product-image-video`}</span>
      </label>
      <div className="mt-1">
        <UploadMedia
          name={t`upload-the-image-or-video`}
          addNewMedias={addNewMedias}
          countVideo={countVideo}
          fileLimit={fileLimit}
          // fileLimit={10}
          acceptFiles={acceptedFiles}
        />
      </div>
      <div className="mt-2.5">
        <label>
          <p className="txt-style-medium text-base">{t`constrain`}</p>
          <p className="text-xs mt-0.5">{t`dimension`} : 650x650px</p>
          <p className="text-xs">{t`supported-File-Type`}</p>
          <p className="text-xs">{t`maximum-file-size-and-number-file`}</p>
        </label>
      </div>
      <div className="mt-7">
        <label>
          <span className="txt-style-medium text-base">{t`image-video-order`}</span>
          <span className="txt-style-medium text-sm pl-2.5">{t`drag-and-drop-to-re-arrange-order`}</span>
        </label>
      </div>
      <SortComponent onSortEnd={onSortEnd} axis="xy" useDragHandle>
        {listUpload.map((item: Media | MediaObject, index: number) => (
          <SortableItem key={item._id} index={index} {...item} />
        ))}
      </SortComponent>
    </div>
  );
}
