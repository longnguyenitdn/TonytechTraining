import React from "react";

import InvoiceForm from "../../components/invoiceForm";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
import { useContext } from "react";
const AddNewInvoice = () => {
  const loadingProvider = useContext(LoadingContext);
  const invoiceProvider = useContext(InvoiceContext);
  const { houseId } = useParams();

  return (
    <div className="new-invoice-cover">
      <InvoiceForm
        houseId={houseId}
        type={"Add"}
        loadingProvider={loadingProvider}
        invoiceProvider={invoiceProvider}
      />
    </div>
  );
};
export default AddNewInvoice;
