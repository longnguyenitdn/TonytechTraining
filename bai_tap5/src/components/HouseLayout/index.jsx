import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingProvider";
import Header from "../Header";
import Loading from "../Loading";

const DefaultHouse = () => {
  const loadingProvider = useContext(LoadingContext);
  return (
    <>
      <Header />
      <div className="container body-container">
        <h3 className="t-cen">User:Admin</h3>
        <div className="body-content-cover">
          <Outlet />
        </div>
        <div hidden={loadingProvider.statusLoading === false}>
          <Loading />
        </div>
      </div>
    </>
  );
};
export default DefaultHouse;
