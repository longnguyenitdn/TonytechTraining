import React from "react";
import AddNewInvoiceHeader from "../../components/addNewInvoiceHeader";
import InvoiceForm from "../../components/invoiceForm";
import { useParams } from "react-router-dom";
const AddNewInvoice = () => {
  const { houseId } = useParams();

  return (
    <div className="new-invoice">
      <AddNewInvoiceHeader />
      <InvoiceForm houseId={houseId} type="add" />
    </div>
  );
};
export default AddNewInvoice;
