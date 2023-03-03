import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

import { ROUTER } from "../../config/routers";
import { getRouter } from "../../config/routers";

const InvoiceDetailContent = (props) => {
  const houseLink = getRouter(ROUTER.invoices, {
    houseId: props.invoice.houseId,
  });
  const invoiceEditLink = getRouter(ROUTER.invoiceEdit, {
    houseId: props.invoice.houseId,
    invoiceId: props.invoice.id,
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
            <li>Nhà: {props.houseName ? props.houseName : "..."}</li>
            <li>
              Loại hóa đơn:{" "}
              {props.invoice ? props.invoice.typeOfInvoice : "..."}
            </li>
            <li>
              Ngày thanh toán: {props.invoice ? props.invoice.expireDay : "..."}
            </li>
            <li>Số tiền: {props.invoice ? props.invoice.amount : "..."} đ </li>
            <li>
              Trạng thái thanh toán:
              {props.invoice
                ? props.invoice.status
                  ? " Đã thanh toán"
                  : " Chưa thanh toán"
                : "..."}
            </li>
          </ul>
          <div className="btn-invoice-func f-row f-around">
            <Link to={invoiceEditLink}>
              <button>Chỉnh sửa</button>
            </Link>
            <button onClick={() => props.handleRemoveInvoice(props.invoice.id)}>
              <Link to={houseLink}>Xóa</Link>
            </button>
          </div>
        </div>
        <button className="btn-return">
          <Link to={houseLink}>
            <IoReturnDownBack />
          </Link>
        </button>
      </div>
    </>
  );
};
export default InvoiceDetailContent;
