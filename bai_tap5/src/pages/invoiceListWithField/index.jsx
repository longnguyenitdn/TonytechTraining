import React from "react";
import Invoice from "../../components/invoice";
const InvoiceListWithField = (props) => {
  const filterList = props.fillterInvoiceList.filter(
    (item) => item.typeOfInvoice === props.filterField
  );

  return (
    <div className="body-invoices-content f-row f-col">
      {filterList.map((item) => (
        <Invoice invoice={item} key={item.id} />
      ))}
    </div>
  );
};
export default InvoiceListWithField;
