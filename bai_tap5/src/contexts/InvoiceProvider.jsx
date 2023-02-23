import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { getInvoice } from "../api/invoice";
import { LoadingContext } from "./LoadingProvider";
export const InvoiceContext = createContext();
const InvoiceProvider = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const [invoiceList, setInvoiceList] = useState([]);

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

  return (
    <InvoiceContext.Provider
      value={{
        invoiceList: invoiceList,
        setInvoiceList: setInvoiceList,
      }}
    >
      {props.children}
    </InvoiceContext.Provider>
  );
};
export default InvoiceProvider;
