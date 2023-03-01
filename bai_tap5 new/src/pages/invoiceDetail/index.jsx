import React from "react";
import InvoiceDetailContent from "../../components/invoiceDetailContent";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { HouseContext } from "../../contexts/HouseProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
const InvoiceDetail = () => {
  const houseProvider = useContext(HouseContext);
  const invoiceProvider = useContext(InvoiceContext);

  const { invoiceId } = useParams();
  const { houseId } = useParams();
  return (
    <InvoiceDetailContent
      houseProvider={houseProvider}
      invoiceProvider={invoiceProvider}
      invoiceId={invoiceId}
      houseId={houseId}
    />
  );
};
export default InvoiceDetail;
