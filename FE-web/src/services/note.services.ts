import { NoteModelForm } from "src/feature/notes/types";
import axios from "src/lib/client/request";

export function createNote(body: NoteModelForm) {
  return axios.post("/note", { ...body });
}
export function updateNote(id: string | undefined | string[], body: NoteModelForm) {
  return axios.patch(`/note/${id}`, { ...body });
}
export function deleteNote(id: string | undefined | string[]) {
  return axios.delete(`/note/${id}`);
}
