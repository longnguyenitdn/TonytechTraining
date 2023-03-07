import { myFetch } from "./myFetch";

const getInvoice = () => {
  return myFetch("/invoices", "GET");
};
const addNewInvoice = (invoice) => {
  const link = "/invoices";
  const option = "POST";
  return myFetch(link, option, invoice);
};
const editInvoice = (invoice) => {
  let link = `/invoices/${invoice.id}`;
  let method = "PUT";
  return myFetch(link, method, invoice);
};
const deleteInvoice = (id) => {
  const link = `/invoices/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};
export { addNewInvoice, editInvoice, deleteInvoice, getInvoice };
