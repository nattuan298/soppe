import { call, put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import paramsSerializer from "src/lib/paramsSerializer";
import {
  getNoteByIdFulfiller,
  getNoteByIdPending,
  getNoteByIdReject,
  getNoteListFulfiller,
  getNoteListPending,
  getNoteListReject,
} from "./notes.slice";
import {
  ApiListModel,
  GET_LIST_NOTE,
  GET_LIST_NOTE_BY_ID,
  NoteModel,
  ParamListRequestModel,
  getNoteListByIdProps,
  getNoteListProps,
} from "./types";
import axiosCutome from "src/lib/client/request";

const getNoteList = async (params: ParamListRequestModel) => {
  const config = paramsSerializer(params);
  const paramsURL = config !== "" ? `?${config}` : "";
  const response = await axiosCutome.get(`${apiRoute.note.note}${paramsURL}`);
  return response.data;
};
const getNoteListById = async (id: string | string[]) => {
  const response = await axiosCutome.get(`${apiRoute.note.note}/${id}`);
  return response.data;
};

export function* getNoteListActions(action: getNoteListProps) {
  try {
    yield put(getNoteListPending());
    const res: ApiListModel<NoteModel> = yield call(() => getNoteList(action.payload));
    console.log(res.data);
    yield put(getNoteListFulfiller(res));
  } catch (error) {
    yield put(getNoteListReject(error));
  }
}

export function* getNoteListByIdActions(action: getNoteListByIdProps) {
  try {
    yield put(getNoteByIdPending());
    const respById: NoteModel = yield call(() => getNoteListById(action.payload.id));
    yield put(getNoteByIdFulfiller(respById));
  } catch (error) {
    yield put(getNoteByIdReject(error));
  }
}

export const getNoteListDispatch = (payload: ParamListRequestModel) => ({
  type: GET_LIST_NOTE,
  payload,
});
export const getNoteListByIdDispatch = (payload: { id: string | string[] }) => ({
  type: GET_LIST_NOTE_BY_ID,
  payload,
});
