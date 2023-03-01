import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";

import { ROUTER } from "../../config/routers";
import { getRouter } from "../../config/routers";

const InvoiceDetailContent = (props) => {
  const house = props.houseProvider.houseList.find(
    (item) => item.id === parseInt(props.houseId)
  );
  const invoice = props.invoiceProvider.invoiceList.find(
    (item) => item.id === parseInt(props.invoiceId)
  );
  const houseLink = getRouter(ROUTER.invoices, {
    houseId: props.houseId,
  });
  const invoiceEditLink = getRouter(ROUTER.invoiceEdit, {
    houseId: props.houseId,
    invoiceId: props.invoiceId,
  });

  return (
    <>
      <div className="invoice-detail">
        <div className="invoice-detail-cover">
          <div className="invoice-logo f-row f-cen">
            <FaFileInvoiceDollar className="edit-invoice-icon" />
            <h3>Invoice's Infomation</h3>
          </div>
          <ul>
            <li>Nhà: {house ? house.name : "..."}</li>
            <li>Loại hóa đơn: {invoice ? invoice.typeOfInvoice : "..."}</li>
            <li>Ngày thanh toán: {invoice ? invoice.expireDay : "..."}</li>
            <li>Số tiền: {invoice ? invoice.amount : "..."} đ </li>
            <li>
              Trạng thái thanh toán:
              {invoice
                ? invoice.status
                  ? " Đã thanh toán"
                  : " Chưa thanh toán"
                : "..."}
            </li>
          </ul>
          <div className="btn-invoice-func f-row f-around">
            <Link to={invoiceEditLink}>
              <button>Chỉnh sửa</button>
            </Link>
            <button
              onClick={() =>
                props.houseProvider.handleRemoveInvoice(
                  parseInt(props.invoiceId)
                )
              }
            >
              <Link to={houseLink}>Xóa</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default InvoiceDetailContent;
