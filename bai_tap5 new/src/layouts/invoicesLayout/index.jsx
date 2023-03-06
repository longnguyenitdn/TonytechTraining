import React, { useContext, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
const InvoicesLayout = (props) => {
  const invoiceProvider = useContext(InvoiceContext);
  useEffect(() => {
    return () => {
      invoiceProvider.setFilterField("");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="edit-body-content-cover">
      <Outlet />
    </div>
  );
};
export default InvoicesLayout;
