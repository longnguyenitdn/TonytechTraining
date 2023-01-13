import { myFetch } from "./myFetch";

const getLabel = () => {
  return myFetch("/labels", "GET");
};
const addNewLabel = (label) => {
  const link = "/labels";
  const option = "POST";
  return myFetch(link, option, label);
};
const editLabel = (label) => {
  let link = `/labels/${label.id}`;
  let method = "PUT";
  return myFetch(link, method, label);
};
const deleteLabel = (id) => {
  const link = `/labels/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};
export { addNewLabel, editLabel, deleteLabel, getLabel };
