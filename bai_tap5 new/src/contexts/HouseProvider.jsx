import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { getHouse } from "../api/house";
import { InvoiceContext } from "./InvoiceProvider";
import { LoadingContext } from "./LoadingProvider";
import { deleteInvoice } from "../api/invoice";

export const HouseContext = createContext();
const HouseProvider = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const invoiceProvider = useContext(InvoiceContext);
  const [houseList, setHouseList] = useState([]);

  useEffect(() => {
    loadingProvider.setStatusLoading(true);
    getHouse()
      .then((data) => {
        setHouseList(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRemoveInvoice = (id) => {
    loadingProvider.setStatusLoading(true);
    deleteInvoice(id)
      .then(() => {
        let currentList = invoiceProvider.invoiceList;
        currentList = currentList.filter((item) => item.id !== id);
        invoiceProvider.setInvoiceList(currentList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };
  return (
    <HouseContext.Provider
      value={{
        houseList: houseList,
        setHouseList: setHouseList,
        handleRemoveInvoice: handleRemoveInvoice,
      }}
    >
      {props.children}
    </HouseContext.Provider>
  );
};
export default HouseProvider;
