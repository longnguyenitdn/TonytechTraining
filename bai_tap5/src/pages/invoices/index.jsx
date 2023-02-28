import React, { useContext, useEffect, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
import Invoice from "../../components/invoice";
import InvoiceListWithField from "../invoiceListWithField";
const Invoices = (props) => {
  const { houseId } = useParams();
  const [fillterInvoiceList, setFilterInvoiceList] = useState([]);
  const invoiceProvider = useContext(InvoiceContext);
  const [filterField, setFilterField] = useState("");
  useEffect(() => {
    setFilterInvoiceList(
      invoiceProvider.invoiceList.filter(
        (item) => item.houseId === parseInt(houseId)
      )
    );
  }, [houseId, invoiceProvider.invoiceList, filterField]);

  const onClickToFilterInvoiceType = (type) => {
    setFilterField(type);
  };
  return (
    <>
      <div className="body-invoiceTypes-cover container f-row f-around">
        <div
          onClick={() => onClickToFilterInvoiceType("Điện")}
          className="body-invoiceType t-cen"
        >
          Điện
        </div>
        <div
          onClick={() => onClickToFilterInvoiceType("Nước")}
          className="body-invoiceType t-cen"
        >
          Nước
        </div>
        <div
          onClick={() => onClickToFilterInvoiceType("Internet")}
          className="body-invoiceType t-cen"
        >
          Internet
        </div>
      </div>
      {filterField === "" && (
        <div className="body-invoices-content f-row f-col">
          {fillterInvoiceList.map((item) => (
            <Invoice invoice={item} key={item.id} />
          ))}
        </div>
      )}
      {filterField !== "" && (
        <InvoiceListWithField
          fillterInvoiceList={fillterInvoiceList}
          filterField={filterField}
        />
      )}
      <button className="btn-add-new-invoice">
        <Link to={"add"}>
          <AiFillFileAdd className="btn-green" />
        </Link>
      </button>
    </>
  );
};
export default Invoices;
