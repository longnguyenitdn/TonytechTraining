import React from "react";
import AddNewInvoiceHeader from "../AddNewInvoiceHeader";
import InvoiceForm from "../InvoiceForm";
const AddNewInvoice = () => {
  return (
    <div className="new-invoice">
      <AddNewInvoiceHeader />
      <InvoiceForm />
    </div>
  );
};
export default AddNewInvoice;
