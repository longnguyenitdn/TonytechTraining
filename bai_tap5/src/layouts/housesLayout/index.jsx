import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { LoadingContext } from "../../contexts/LoadingProvider";
import Header from "../../components/header";
import Loading from "../../components/loading";

const HouseLayout = () => {
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
export default HouseLayout;
