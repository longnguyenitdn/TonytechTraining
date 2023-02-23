import React, { useContext } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
import Invoice from "../Invoice";
const Invoices = () => {
  const { houseId } = useParams();
  const invoiceProvider = useContext(InvoiceContext);
  const fillterInvoiceList = invoiceProvider.invoiceList.filter(
    (item) => item.houseId === parseInt(houseId)
  );
  return (
    <>
      <div className="body-invoices-content f-row f-col">
        {fillterInvoiceList.map((item) => (
          <Invoice value={item} key={item.id} />
        ))}
      </div>
      <Link to={"addInvoice"}>
        <button className="btn-add-new-invoice">
          <AiFillFileAdd />
        </button>
      </Link>
    </>
  );
};
export default Invoices;
