import React, { useContext, useState, useEffect } from "react";
import { BsHouse } from "react-icons/bs";
import { HouseContext } from "../../contexts/HouseProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";

import { LoadingContext } from "../../contexts/LoadingProvider";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { Outlet } from "react-router-dom";
import { ROUTER } from "../../config/routers";
import HouseDetailContent from "../../components/houseDetailContent";

const HouseDetailLayout = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const [houseData, setHouseData] = useState({ name: "" });

  const { houseId } = useParams();

  const houseProvider = useContext(HouseContext);
  const invoiceProvider = useContext(InvoiceContext);

  useEffect(
    () =>
      setHouseData(
        houseProvider.houseList.find((item) => item.id === parseInt(houseId))
      ),
    [houseProvider.houseList, houseId]
  );

  const setHouseTempBeforeEdit = (e) => {
    setHouseData({
      ...houseData,
      name: e.target.value,
    });
  };

  const handleRemoveHouseSubmit = () => {
    houseProvider
      .handleRemoveHouse(parseInt(houseId))
      .then((data) => {
        invoiceProvider.handleRemoveInvoiceListbyHouseId(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div hidden={loadingProvider.statusLoading === false}>
        <Loading />
      </div>
      <div className="container t-cen header-logo-container">
        <div className="header-logo f-row f-cen">
          <Link to={ROUTER.home}>
            <BsHouse className="edit-house-icon" />
          </Link>
          <h2>House's Infomation</h2>
        </div>
      </div>
      <div className="edit-container body-container">
        <HouseDetailContent
          setHouseTempBeforeEdit={setHouseTempBeforeEdit}
          invoiceList={invoiceProvider.invoiceList}
          houseData={houseData}
          handleEditHouse={houseProvider.handleEditHouse}
          handleRemoveHouseSubmit={handleRemoveHouseSubmit}
        />
        <Outlet />
      </div>
    </>
  );
};
export default HouseDetailLayout;
