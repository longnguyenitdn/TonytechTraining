import { myFetch } from "./myFetch";

const getNote = () => {
  return myFetch("/notes", "GET");
};
const addNewNote = (note) => {
  const link = "/notes";
  const option = "POST";
  return myFetch(link, option, note);
};
const editNote = (note) => {
  let link = `/notes/${note.id}`;
  let method = "PUT";
  return myFetch(link, method, note);
};
const deleteNote = (id) => {
  const link = `/notes/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};
export { addNewNote, editNote, deleteNote, getNote };
