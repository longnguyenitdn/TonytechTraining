import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { addNewInvoice } from "../../api/invoice";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { editInvoice } from "../../api/invoice";

const InvoiceForm = () => {
  const [typeOfInvoice, setTypeOfInvoice] = useState("");
  const [expireDay, setExpireDay] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [notice, setNotice] = useState(false);
  const [id, setId] = useState(null);
  const loadingProvider = useContext(LoadingContext);
  const invoiceProvider = useContext(InvoiceContext);
  let { houseId } = useParams();
  const { editInvoiceId } = useParams();
  const goBack = useNavigate();

  useEffect(() => {
    if (editInvoiceId) {
      const editInvoice = invoiceProvider.invoiceList.find(
        (item) => item.id === parseInt(editInvoiceId)
      );
      setId(editInvoice.id);
      setExpireDay(editInvoice.expireDay);
      setTypeOfInvoice(editInvoice.typeOfInvoice);
      setAmount(editInvoice.amount);
      setStatus(editInvoice.status);
    }
  }, [editInvoiceId, invoiceProvider.invoiceList]);

  const handleEditInvoice = () => {
    const invoice = { id, expireDay, typeOfInvoice, amount, status };
    const isEmpty = checkEmptyField();
    if (!isEmpty) {
      loadingProvider.setStatusLoading(true);
      editInvoice(invoice)
        .then((invoice) => {
          let currentList = invoiceProvider.invoiceList;
          currentList = currentList.map((item) => {
            if (item.id === invoice.id) {
              item.expireDay = invoice.expireDay;
              item.typeOfInvoice = invoice.typeOfInvoice;
              item.amount = invoice.amount;
              item.status = invoice.status;
            }
            return item;
          });
          invoiceProvider.setInvoiceList(currentList);
          goBack(-1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loadingProvider.setStatusLoading(false);
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
      houseId = parseInt(houseId);
      const invoice = {
        typeOfInvoice,
        expireDay,
        amount,
        status,
        houseId,
      };
      loadingProvider.setStatusLoading(true);

      addNewInvoice(invoice)
        .then((data) => {
          invoiceProvider.setInvoiceList([
            data,
            ...invoiceProvider.invoiceList,
          ]);

          goBack(-1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loadingProvider.setStatusLoading(false);
        });
    }
  };

  return (
    <form>
      <div className="new-invoice">
        <ul>
          <li>
            <div>
              <label htmlFor="expireDay">Ngày thanh toán:</label>
              <input
                className="input-style"
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
              <label htmlFor="electric">Điện</label>
              <input
                checked={typeOfInvoice === "Điện"}
                type="radio"
                id="electric"
                value="Điện"
                name="typeInvoice"
                onChange={(e) => setTypeOfInvoice(e.target.value)}
              />
              <label htmlFor="water">Nước</label>
              <input
                checked={typeOfInvoice === "Nước"}
                type="radio"
                id="water"
                value="Nước"
                name="typeInvoice"
                onChange={(e) => setTypeOfInvoice(e.target.value)}
              />
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
          </li>

          <li>
            <div>
              <label htmlFor="amount">Số tiền:</label>
              <input
                className="input-style"
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
              <label htmlFor="true">Đã thanh toán</label>
              <input
                checked={status === "true"}
                type="radio"
                id="true"
                value={true}
                name="hasPay"
                onChange={(e) => setStatus(e.target.value)}
              />
              <label htmlFor="false">Chưa thanh toán</label>
              <input
                checked={status === "false"}
                type="radio"
                id="false"
                value={false}
                name="hasPay"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </li>
        </ul>
        <div className="btn-create-invoice f-row f-around">
          <Link to={notice ? `/house/${houseId}` : null}>
            <button
              hidden={editInvoiceId ? true : false}
              type="button"
              onClick={() => handleAddNewInvoice()}
            >
              Tạo mới
            </button>
          </Link>
          <button
            onClick={handleEditInvoice}
            className="btn-edit-confirm"
            type="button"
            hidden={editInvoiceId ? false : true}
          >
            Xác nhận
          </button>
          <button onClick={clearInputInvoice} type="button">
            Làm trống
          </button>
        </div>
        {notice === true && <h4>Chú ý: Vui lòng điền đầy đủ thông tin</h4>}
      </div>
    </form>
  );
};
export default InvoiceForm;
