import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";

const EditInvoiceHeader = () => {
  return (
    <div className="new-invoice-logo f-row f-cen">
      <FaFileInvoiceDollar className="new-invoice-icon" />
      <h3>Edit Invoice</h3>
    </div>
  );
};
export default EditInvoiceHeader;
