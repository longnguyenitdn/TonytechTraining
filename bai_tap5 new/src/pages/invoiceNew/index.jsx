import React from "react";

import InvoiceForm from "../../components/invoiceForm";
import { useParams, useNavigate } from "react-router-dom";

import { InvoiceContext } from "../../contexts/InvoiceProvider";
import { useContext } from "react";
import { ROUTER, getRouter } from "../../config/routers";
const AddNewInvoice = () => {
  const { houseId } = useParams();
  const invoicesLink = getRouter(ROUTER.invoices, {
    houseId: houseId,
  });
  const navigate = useNavigate();
  const invoiceProvider = useContext(InvoiceContext);
  const handleSubmitAdd = (invoice) => {
    invoiceProvider.handleAddNewInvoice(invoice);
    navigate(invoicesLink);
  };
  return (
    <div className="new-invoice-cover">
      <InvoiceForm
        filterField={invoiceProvider.filterField}
        houseId={houseId}
        type={"Add"}
        handleSubmitAdd={handleSubmitAdd}
      />
    </div>
  );
};
export default AddNewInvoice;
