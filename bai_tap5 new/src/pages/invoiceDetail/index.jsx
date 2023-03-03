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

  const house = houseProvider.houseList.find(
    (item) => item.id === parseInt(houseId)
  );
  const invoice = invoiceProvider.invoiceList.find(
    (item) => item.id === parseInt(invoiceId)
  );

  return (
    <InvoiceDetailContent
      invoice={invoice}
      houseName={house.name}
      handleRemoveInvoice={invoiceProvider.handleRemoveInvoice}
    />
  );
};
export default InvoiceDetail;
