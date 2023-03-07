import React from "react";
import { Link } from "react-router-dom";

import { ROUTER } from "../../config/routers";
import { getRouter } from "../../config/routers";

const Invoice = (props) => {
  const invoice = props.invoice;

  const invoiceLink = getRouter(ROUTER.invoiceDetail, {
    houseId: invoice.houseId,
    invoiceId: invoice.id,
  });
  const convertDate = (str) => {
    return str.split("-").reverse().join("-");
  };
  return (
    <div className="invoice-cover">
      <Link to={invoiceLink}>
        <div className="invoice">
          <div className="invoice-key f-row f-bet f-cen">
            <h4>{invoice.typeOfInvoice}</h4>
            <p>{convertDate(invoice.expireDay)}</p>
          </div>
          <div className="invoice-key f-row f-bet">
            <h4>{invoice.amount} đ</h4>
            <h4 className={invoice.status === false ? "highlight-text" : ""}>
              {invoice.status === false ? "chưa thanh toán" : "đã thanh toán"}
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Invoice;
