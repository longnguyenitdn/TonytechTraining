import React from "react";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="container body-container">
      <h3 className="t-cen">ID:SHGDJFH</h3>
      <div className="body-content-cover">
        <Outlet />
      </div>
    </div>
  );
};
export default Body;
