import React, { useEffect } from "react";
import { useState } from "react";
import { addNewInvoice } from "../../api/invoice";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { editInvoice } from "../../api/invoice";
import { ROUTER, getRouter } from "../../config/routers";

const InvoiceForm = (props) => {
  const [typeOfInvoice, setTypeOfInvoice] = useState("");
  const [expireDay, setExpireDay] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [notice, setNotice] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const invoiceEditLink = getRouter(ROUTER.invoiceDetail, {
    houseId: props.houseId,
    invoiceId: props.invoiceId,
  });
  const invoicesLink = getRouter(ROUTER.invoices, {
    houseId: props.houseId,
  });

  useEffect(() => {
    if (props.type === "Edit") {
      const editInvoice = props.invoiceProvider.invoiceList.find(
        (item) => item.id === parseInt(props.invoiceId)
      );
      setId(editInvoice.id);
      setExpireDay(editInvoice.expireDay);
      setTypeOfInvoice(editInvoice.typeOfInvoice);
      setAmount(editInvoice.amount);
      setStatus(editInvoice.status);
    }
  }, [props.invoiceId, props.invoiceProvider.invoiceList, props.type]);

  const handleEditInvoice = () => {
    const houseId = parseInt(props.houseId);
    const invoice = { id, expireDay, typeOfInvoice, amount, status, houseId };

    const isEmpty = checkEmptyField();
    if (!isEmpty) {
      props.loadingProvider.setStatusLoading(true);
      editInvoice(invoice)
        .then((invoice) => {
          let currentList = props.invoiceProvider.invoiceList;
          currentList = currentList.map((item) => {
            if (item.id === invoice.id) {
              item.expireDay = invoice.expireDay;
              item.typeOfInvoice = invoice.typeOfInvoice;
              item.amount = invoice.amount;
              item.status = invoice.status;
              item.houseId = invoice.houseId;
            }
            return item;
          });
          props.invoiceProvider.setInvoiceList(currentList);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          props.loadingProvider.setStatusLoading(false);
        });
    }
  };
  const clearInputInvoice = () => {
    setExpireDay("");
    setTypeOfInvoice("");
    setAmount("");
    setStatus("");
  };

  const checkEmptyField = () => {
    if (
      typeOfInvoice === "" ||
      expireDay === "" ||
      amount === "" ||
      status === ""
    ) {
      setNotice(true);
      return true;
    } else {
      setNotice(false);
      return false;
    }
  };

  const handleAddNewInvoice = () => {
    const isEmpty = checkEmptyField();
    if (!isEmpty) {
      const houseId = parseInt(props.houseId);
      const invoice = {
        typeOfInvoice,
        expireDay,
        amount,
        status,
        houseId,
      };
      props.loadingProvider.setStatusLoading(true);

      addNewInvoice(invoice)
        .then((data) => {
          props.invoiceProvider.setInvoiceList([
            data,
            ...props.invoiceProvider.invoiceList,
          ]);
          navigate(invoicesLink);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          props.loadingProvider.setStatusLoading(false);
        });
    }
  };

  return (
    <form>
      <div className="new-invoice-logo f-row f-cen">
        <FaFileInvoiceDollar className="new-invoice-icon" />
        <h3>{props.type} Invoice</h3>
      </div>
      <div className="new-invoice">
        <ul>
          <li>
            <div>
              <label htmlFor="expireDay">Ngày thanh toán:</label>
              <input
                className="input-style padding-input0-10"
                value={expireDay}
                type="text"
                id="expireDay"
                placeholder="dd-mm-yyyy"
                onChange={(e) => setExpireDay(e.target.value)}
              />
            </div>
          </li>
          <li>
            <p>Loại hóa đơn:</p>
            <div>
              <div>
                <label htmlFor="electric">Điện</label>
                <input
                  checked={typeOfInvoice === "Điện"}
                  type="radio"
                  id="electric"
                  value="Điện"
                  name="typeInvoice"
                  onChange={(e) => setTypeOfInvoice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="water">Nước</label>
                <input
                  checked={typeOfInvoice === "Nước"}
                  type="radio"
                  id="water"
                  value="Nước"
                  name="typeInvoice"
                  onChange={(e) => setTypeOfInvoice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="internet">Internet</label>
                <input
                  checked={typeOfInvoice === "Internet"}
                  type="radio"
                  id="internet"
                  value="Internet"
                  name="typeInvoice"
                  onChange={(e) => setTypeOfInvoice(e.target.value)}
                />
              </div>
            </div>
          </li>

          <li>
            <div>
              <label htmlFor="amount">Số tiền:</label>
              <input
                className="input-style padding-input5-10"
                value={amount}
                type="text"
                id="amount"
                placeholder="vnd"
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              />
            </div>
          </li>
          <li>
            <div>
              <div className="margin-r50">
                <label htmlFor="true">Đã thanh toán</label>
                <input
                  checked={status === true}
                  type="radio"
                  id="true"
                  value={true}
                  name="hasPay"
                  onChange={() => setStatus(true)}
                />
              </div>
              <div>
                <label htmlFor="false">Chưa thanh toán</label>
                <input
                  checked={status === false}
                  type="radio"
                  id="false"
                  value={false}
                  name="hasPay"
                  onChange={() => setStatus(false)}
                />
              </div>
            </div>
          </li>
        </ul>
        <div className="btn-create-invoice f-row f-around">
          <div>
            <button
              hidden={props.invoiceId ? true : false}
              type="button"
              onClick={() => handleAddNewInvoice()}
            >
              <Link>Tạo mới</Link>
            </button>
            <button
              onClick={handleEditInvoice}
              type="button"
              hidden={props.invoiceId ? false : true}
            >
              <Link to={invoiceEditLink}>Xác nhận</Link>
            </button>
          </div>
          <div>
            <button onClick={clearInputInvoice} type="button">
              Làm trống
            </button>
          </div>
        </div>
        {notice === true && <h4>Chú ý: Vui lòng điền đầy đủ thông tin</h4>}
        <button className="btn-return">
          <Link to={props.type === "Edit" ? invoiceEditLink : invoicesLink}>
            <IoReturnDownBack />
          </Link>
        </button>
      </div>
    </form>
  );
};
export default InvoiceForm;
