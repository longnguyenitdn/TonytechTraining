import { myFetch } from "./myFetch";

const getHouse = () => {
  return myFetch("/houses", "GET");
};
const addNewHouse = (house) => {
  const link = "/houses";
  const option = "POST";
  return myFetch(link, option, house);
};
const editHouse = (house) => {
  let link = `/houses/${house.id}`;
  let method = "PUT";
  return myFetch(link, method, house);
};
const deleteHouse = (id) => {
  const link = `/houses/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};
export { addNewHouse, editHouse, deleteHouse, getHouse };
