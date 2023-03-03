import React, { useEffect } from "react";
import { useState } from "react";

import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

import { Link } from "react-router-dom";
import { ROUTER, getRouter } from "../../config/routers";

const InvoiceForm = (props) => {
  const [notice, setNotice] = useState(false);
  const [tempInvoice, setTempInvoice] = useState({
    id: null,
    houseId: parseInt(props.houseId),
    typeOfInvoice: "",
    expireDay: "",
    amount: "",
    status: "",
  });

  useEffect(() => {
    if (props.type === "Edit") {
      setTempInvoice(props.invoice);
    }
  }, [props.type, props.invoice]);
  const invoiceEditLink = getRouter(ROUTER.invoiceDetail, {
    houseId: props.invoice?.houseId,
    invoiceId: props.invoice?.id,
  });

  const invoicesLink = getRouter(ROUTER.invoices, {
    houseId: props.houseId,
  });
  const clearInputInvoice = () => {
    setTempInvoice({
      ...tempInvoice,
      typeOfInvoice: "",
      expireDay: "",
      amount: "",
      status: "",
    });
  };

  const checkEmptyFieldBeforeSubmit = () => {
    let { typeOfInvoice, expireDay, amount, status } = tempInvoice;
    if (
      typeOfInvoice === "" ||
      expireDay === "" ||
      amount === "" ||
      status === ""
    ) {
      setNotice(true);
      return;
    } else {
      if (props.type === "Edit") {
        props.handleSubmitEdit(tempInvoice);
      } else {
        props.handleSubmitAdd(tempInvoice);
      }
      setNotice(false);
      return;
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
                value={tempInvoice.expireDay}
                type="text"
                id="expireDay"
                placeholder="dd-mm-yyyy"
                onChange={(e) =>
                  setTempInvoice({ ...tempInvoice, expireDay: e.target.value })
                }
              />
            </div>
          </li>
          <li>
            <p>Loại hóa đơn:</p>
            <div>
              <div>
                <label htmlFor="electric">Điện</label>
                <input
                  checked={tempInvoice.typeOfInvoice === "Điện"}
                  type="radio"
                  id="electric"
                  value="Điện"
                  name="typeInvoice"
                  onChange={(e) =>
                    setTempInvoice({
                      ...tempInvoice,
                      typeOfInvoice: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="water">Nước</label>
                <input
                  checked={tempInvoice.typeOfInvoice === "Nước"}
                  type="radio"
                  id="water"
                  value="Nước"
                  name="typeInvoice"
                  onChange={(e) =>
                    setTempInvoice({
                      ...tempInvoice,
                      typeOfInvoice: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="internet">Internet</label>
                <input
                  checked={tempInvoice.typeOfInvoice === "Internet"}
                  type="radio"
                  id="internet"
                  value="Internet"
                  name="typeInvoice"
                  onChange={(e) =>
                    setTempInvoice({
                      ...tempInvoice,
                      typeOfInvoice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </li>

          <li>
            <div>
              <label htmlFor="amount">Số tiền:</label>
              <input
                className="input-style padding-input5-10"
                value={tempInvoice.amount}
                type="text"
                id="amount"
                placeholder="vnd"
                onChange={(e) =>
                  setTempInvoice({
                    ...tempInvoice,
                    amount: e.target.value || 0,
                  })
                }
              />
            </div>
          </li>
          <li>
            <div>
              <div className="margin-r50">
                <label htmlFor="true">Đã thanh toán</label>
                <input
                  checked={tempInvoice.status === true}
                  type="radio"
                  id="true"
                  value={true}
                  name="hasPay"
                  onChange={() =>
                    setTempInvoice({ ...tempInvoice, status: true })
                  }
                />
              </div>
              <div>
                <label htmlFor="false">Chưa thanh toán</label>
                <input
                  checked={tempInvoice.status === false}
                  type="radio"
                  id="false"
                  value={false}
                  name="hasPay"
                  onChange={() =>
                    setTempInvoice({ ...tempInvoice, status: false })
                  }
                />
              </div>
            </div>
          </li>
        </ul>
        <div className="btn-create-invoice f-row f-around">
          <div>
            <button
              hidden={props.type === "Edit" ? true : false}
              type="button"
              onClick={() => checkEmptyFieldBeforeSubmit()}
            >
              <Link>Tạo mới</Link>
            </button>
            <button
              onClick={checkEmptyFieldBeforeSubmit}
              type="button"
              hidden={props.type === "Add" ? true : false}
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
