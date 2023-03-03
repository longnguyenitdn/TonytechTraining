import React from "react";
import { useParams } from "react-router-dom";

import InvoiceForm from "../../components/invoiceForm";
import { useContext } from "react";

import { InvoiceContext } from "../../contexts/InvoiceProvider";
const EditInvoice = () => {
  const { invoiceId } = useParams();

  const invoiceProvider = useContext(InvoiceContext);
  const invoiceEdit = invoiceProvider.invoiceList.find(
    (item) => item.id === parseInt(invoiceId)
  );

  const handleSubmitEdit = (invoice) => {
    invoiceProvider.handleEditInvoice(invoice);
  };

  return (
    <div className="new-invoice-cover">
      <InvoiceForm
        type="Edit"
        invoice={invoiceEdit}
        handleSubmitEdit={handleSubmitEdit}
      />
    </div>
  );
};
export default EditInvoice;
