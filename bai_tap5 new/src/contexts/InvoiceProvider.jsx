import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { getInvoice } from "../api/invoice";
import { LoadingContext } from "./LoadingProvider";
import { deleteInvoice } from "../api/invoice";
import { editInvoice } from "../api/invoice";
import { addNewInvoice } from "../api/invoice";

export const InvoiceContext = createContext();
const InvoiceProvider = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const [invoiceList, setInvoiceList] = useState([]);
  const [filterField, setFilterField] = useState("");

  useEffect(() => {
    loadingProvider.setStatusLoading(true);
    getInvoice()
      .then((data) => {
        setInvoiceList(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddNewInvoice = (invoice) => {
    loadingProvider.setStatusLoading(true);
    addNewInvoice(invoice)
      .then((data) => {
        setInvoiceList([data, ...invoiceList]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };

  const handleRemoveInvoice = (id) => {
    loadingProvider.setStatusLoading(true);
    deleteInvoice(id)
      .then(() => {
        setInvoiceList(invoiceList.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };

  const handleEditInvoice = (invoice) => {
    loadingProvider.setStatusLoading(true);
    editInvoice(invoice)
      .then((invoice) => {
        setInvoiceList(
          invoiceList.map((item) => {
            if (item.id === invoice.id) {
              item.expireDay = invoice.expireDay;
              item.typeOfInvoice = invoice.typeOfInvoice;
              item.amount = invoice.amount;
              item.status = invoice.status;
              item.houseId = invoice.houseId;
            }
            return item;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };
  return (
    <InvoiceContext.Provider
      value={{
        invoiceList: invoiceList,
        filterField: filterField,

        setInvoiceList: setInvoiceList,
        setFilterField: setFilterField,
        handleRemoveInvoice: handleRemoveInvoice,
        handleEditInvoice: handleEditInvoice,
        handleAddNewInvoice: handleAddNewInvoice,
      }}
    >
      {props.children}
    </InvoiceContext.Provider>
  );
};
export default InvoiceProvider;
