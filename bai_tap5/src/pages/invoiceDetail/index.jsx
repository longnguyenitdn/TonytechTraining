import InvoiceDetailContent from "../../components/invoiceDetailContent";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HouseContext } from "../../contexts/HouseProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
const InvoiceDetail = () => {
  const houseProvider = useContext(HouseContext);
  const invoiceProvider = useContext(InvoiceContext);
  const { invoiceId } = useParams();
  const { houseId } = useParams();
  const [house, setHouse] = useState({});
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    setHouse(
      houseProvider.houseList.find((item) => item.id === parseInt(houseId))
    );
    setInvoice(
      invoiceProvider.invoiceList.find(
        (item) => item.id === parseInt(invoiceId)
      )
    );
  }, [
    houseProvider.houseList,
    invoiceProvider.invoiceList,
    houseId,
    invoiceId,
  ]);

  return (
    <InvoiceDetailContent
      invoice={invoice}
      houseName={house?.name}
      handleRemoveInvoice={invoiceProvider.handleRemoveInvoice}
    />
  );
};
export default InvoiceDetail;
