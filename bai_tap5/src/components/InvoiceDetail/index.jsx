import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { HouseContext } from "../../contexts/HouseProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
import { deleteInvoice } from "../../api/invoice";
import { LoadingContext } from "../../contexts/LoadingProvider";

const InvoiceDetail = () => {
  const getBack = useNavigate();
  const loadingProvider = useContext(LoadingContext);
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
  const handleRemoveInvoice = (id) => {
    loadingProvider.setStatusLoading(true);
    deleteInvoice(id)
      .then(() => {
        let currentList = invoiceProvider.invoiceList;
        currentList = currentList.filter((item) => item.id !== id);
        invoiceProvider.setInvoiceList(currentList);
        getBack(-1);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };
  return (
    <>
      <Outlet />
      <div className="invoice-detail">
        <div className="invoice-logo f-row f-cen">
          <FaFileInvoiceDollar className="edit-invoice-icon" />
          <h3>Invoice's Infomation</h3>
        </div>
        <ul>
          <li>Nhà: {`${house.name}`}</li>
          <li>Loại hóa đơn: {invoice?.typeOfInvoice}</li>
          <li>Ngày thanh toán: {invoice?.expireDay}</li>
          <li>Số tiền: {invoice?.amount} đ </li>
          <li>
            Trạng thái thanh toán:{" "}
            {invoice?.status ? "Đã thanh toán" : "Chưa thanh toán"}
          </li>
        </ul>
        <div className="btn-invoice-func f-row f-around">
          <Link to={`/house/${houseId}/editInvoice/${invoiceId}`}>
            <button>Chỉnh sửa</button>
          </Link>
          <button onClick={() => handleRemoveInvoice(parseInt(invoiceId))}>
            Xóa
          </button>
        </div>
      </div>
    </>
  );
};
export default InvoiceDetail;
