import React, { useEffect } from "react";
import { useState } from "react";

import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { ROUTER, getRouter } from "../../config/routers";

const InvoiceForm = (props) => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState(false);
  const [invoice, setInvoice] = useState({
    id: "",
    houseId: parseInt(props.houseId),
    typeOfInvoice: props.filterField || "",
    expireDay: "",
    amount: "",
    status: "",
  });

  useEffect(() => {
    if (props.type === "Edit") {
      setInvoice(props.invoice);
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
    setInvoice({
      ...invoice,
      typeOfInvoice: "",
      expireDay: "",
      amount: "",
      status: "",
    });
  };

  const checkEmptyFieldBeforeSubmit = () => {
    let { typeOfInvoice, expireDay, amount, status } = invoice;

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
        props.handleSubmitEdit(invoice);
        navigate(invoiceEditLink);
      } else {
        props.handleSubmitAdd(invoice);
        navigate(invoicesLink);
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
                value={invoice?.expireDay || ""}
                type="date"
                id="expireDay"
                placeholder="dd-mm-yyyy"
                onChange={(e) =>
                  setInvoice({ ...invoice, expireDay: e.target.value })
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
                  checked={invoice?.typeOfInvoice === "Điện" || false}
                  type="radio"
                  id="electric"
                  value="Điện"
                  name="typeInvoice"
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      typeOfInvoice: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="water">Nước</label>
                <input
                  checked={invoice?.typeOfInvoice === "Nước" || false}
                  type="radio"
                  id="water"
                  value="Nước"
                  name="typeInvoice"
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
                      typeOfInvoice: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="internet">Internet</label>
                <input
                  checked={invoice?.typeOfInvoice === "Internet" || false}
                  type="radio"
                  id="internet"
                  value="Internet"
                  name="typeInvoice"
                  onChange={(e) =>
                    setInvoice({
                      ...invoice,
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
                value={invoice?.amount || ""}
                type="text"
                id="amount"
                placeholder="vnd"
                onChange={(e) =>
                  setInvoice({
                    ...invoice,
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
                  checked={invoice?.status === true || false}
                  type="radio"
                  id="true"
                  value={true}
                  name="hasPay"
                  onChange={() => setInvoice({ ...invoice, status: true })}
                />
              </div>
              <div>
                <label htmlFor="false">Chưa thanh toán</label>
                <input
                  checked={invoice?.status === false || false}
                  type="radio"
                  id="false"
                  value={false}
                  name="hasPay"
                  onChange={() => setInvoice({ ...invoice, status: false })}
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
              onClick={checkEmptyFieldBeforeSubmit}
            >
              Tạo mới
            </button>
            <button
              onClick={checkEmptyFieldBeforeSubmit}
              type="button"
              hidden={props.type === "Add" ? true : false}
            >
              Xác nhận
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
