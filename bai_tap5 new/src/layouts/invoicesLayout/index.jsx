import React from "react";

import { Outlet } from "react-router-dom";
const InvoicesLayout = (props) => {
  return (
    <div className="edit-body-content-cover">
      <Outlet />
    </div>
  );
};
export default InvoicesLayout;
