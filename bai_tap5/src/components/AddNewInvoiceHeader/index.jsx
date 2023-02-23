import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";

const AddNewInvoiceHeader = () => {
  return (
    <div className="new-invoice-logo f-row f-cen">
      <FaFileInvoiceDollar className="new-invoice-icon" />
      <h3>Add New Invoice</h3>
    </div>
  );
};
export default AddNewInvoiceHeader;
