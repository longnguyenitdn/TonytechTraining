import React from "react";
import { useParams } from "react-router-dom";
import EditInvoiceHeader from "../../components/editInvoiceHeader";
import InvoiceForm from "../../components/invoiceForm";
const EditInvoice = () => {
  let { houseId } = useParams();
  const { invoiceId } = useParams();

  return (
    <div className="new-invoice">
      <EditInvoiceHeader />
      <InvoiceForm houseId={houseId} invoiceId={invoiceId} type="edit" />
    </div>
  );
};
export default EditInvoice;
