import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { HouseContext } from "../../contexts/HouseProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";

const InvoiceDetail = () => {
  const houseProvider = useContext(HouseContext);
  const invoiceProvider = useContext(InvoiceContext);
  const getBack = useNavigate();
  const { invoiceId } = useParams();
  const { houseId } = useParams();
  const house = houseProvider.houseList.find(
    (item) => item.id === parseInt(houseId)
  );
  const invoice = invoiceProvider.invoiceList.find(
    (item) => item.id === parseInt(invoiceId)
  );

  const handleRemoveAndReturn = () => {
    houseProvider.handleRemoveInvoice(parseInt(invoiceId));
    getBack(-1);
  };
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
            <Link to={"edit"}>
              <button>Chỉnh sửa</button>
            </Link>
            <button onClick={handleRemoveAndReturn}>Xóa</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default InvoiceDetail;
