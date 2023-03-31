export interface ParamListRequestModel {
  startDate?: string;
  endDate?: string;
  status?: string;
  keyword?: string;
}
export interface ApiListModel<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  error?: string;
  message?: string;
  statusCode?: number;
}
export interface NoteModel {
  title: string;
  memberId: string;
  status: string;
  startDate: string;
  endDate: string;
  details: string;
  _id: string;
}
export interface NoteModelForm {
  title: string;
  status: string;
  startDate: string;
  endDate: string;
  details: string;
}
export interface ItemArray {
  title: string;
  list: Array<NoteModel>;
}

export const GET_LIST_NOTE = "GET_LIST_NOTE";
export const GET_LIST_NOTE_BY_ID = "GET_LIST_NOTE_BY_ID";

export type getNoteListProps = {
  type: typeof GET_LIST_NOTE;
  payload: ParamListRequestModel;
};

export type getNoteListByIdProps = {
  type: typeof GET_LIST_NOTE_BY_ID;
  payload: {
    id: string | string[];
  };
};
