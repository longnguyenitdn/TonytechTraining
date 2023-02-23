import React from "react";
import { Link } from "react-router-dom";

const Invoice = (props) => {
  const invoice = props.value;
  return (
    <Link to={`invoice/${invoice.id}`}>
      <div className="invoice">
        <div className="invoice-key f-row f-bet f-cen">
          <h4>{invoice.typeOfInvoice}</h4>
          <p>{invoice.expireDay}</p>
        </div>
        <div className="invoice-key f-row f-bet">
          <h4>{invoice.amount} đ</h4>
          <h4>
            {invoice.status === false ? "chưa thanh toán" : "đã thanh toán"}
          </h4>
        </div>
      </div>
    </Link>
  );
};
export default Invoice;
