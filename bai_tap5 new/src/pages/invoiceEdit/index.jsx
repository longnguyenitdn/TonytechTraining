import React from "react";
import { useParams } from "react-router-dom";

import InvoiceForm from "../../components/invoiceForm";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
const EditInvoice = () => {
  let { houseId } = useParams();
  const { invoiceId } = useParams();

  const loadingProvider = useContext(LoadingContext);
  const invoiceProvider = useContext(InvoiceContext);
  return (
    <div className="new-invoice-cover">
      <InvoiceForm
        houseId={houseId}
        invoiceId={invoiceId}
        type="Edit"
        loadingProvider={loadingProvider}
        invoiceProvider={invoiceProvider}
      />
    </div>
  );
};
export default EditInvoice;
