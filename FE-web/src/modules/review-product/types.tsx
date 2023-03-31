import { FileObject } from "material-ui-dropzone";

export interface Medias extends FileObject {
  _id?: string;
  url?: string;
  fileType?: string;
  position?: number;
  urlPreSign?: string | ArrayBuffer | null;
}
