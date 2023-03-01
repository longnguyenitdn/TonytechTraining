import React, { useContext, useEffect, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
import Invoice from "../../components/invoice";
import InvoiceListWithField from "../invoiceListWithField";
import { ROUTER, getRouter } from "../../config/routers";
const Invoices = (props) => {
  const { houseId } = useParams();
  const [fillterInvoiceList, setFilterInvoiceList] = useState([]);
  const invoiceProvider = useContext(InvoiceContext);
  const invoiceAddLink = getRouter(ROUTER.invoiceNew, {
    houseId: houseId,
  });
  useEffect(() => {
    setFilterInvoiceList(
      invoiceProvider.invoiceList.filter(
        (item) => item.houseId === parseInt(houseId)
      )
    );
  }, [houseId, invoiceProvider.invoiceList, props.filterField]);

  return (
    <>
      <div className="body-invoiceTypes-cover container f-row f-around ">
        <div
          onClick={() => invoiceProvider.setFilterField("")}
          className={`body-invoiceType t-cen ${
            invoiceProvider.filterField === "" ? "active" : ""
          }`}
        >
          Tất cả
        </div>
        <div
          onClick={() => invoiceProvider.setFilterField("Điện")}
          className={`body-invoiceType t-cen ${
            invoiceProvider.filterField === "Điện" ? "active" : ""
          }`}
        >
          Điện
        </div>
        <div
          onClick={() => invoiceProvider.setFilterField("Nước")}
          className={`body-invoiceType t-cen ${
            invoiceProvider.filterField === "Nước" ? "active" : ""
          }`}
        >
          Nước
        </div>
        <div
          onClick={() => invoiceProvider.setFilterField("Internet")}
          className={`body-invoiceType t-cen ${
            invoiceProvider.filterField === "Internet" ? "active" : ""
          }`}
        >
          Internet
        </div>
      </div>
      {invoiceProvider.filterField === "" && (
        <div className="body-invoices-content f-row f-col">
          {fillterInvoiceList.map((item) => (
            <Invoice invoice={item} key={item.id} />
          ))}
        </div>
      )}
      {invoiceProvider.filterField !== "" && (
        <InvoiceListWithField
          fillterInvoiceList={fillterInvoiceList}
          filterField={invoiceProvider.filterField}
        />
      )}
      <button className="btn-add-new-invoice">
        <Link to={invoiceAddLink}>
          <AiFillFileAdd className="btn-green" />
        </Link>
      </button>
    </>
  );
};
export default Invoices;
