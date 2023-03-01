import React, { useContext, useState, useEffect } from "react";
import { BsHouse, BsFillTrashFill } from "react-icons/bs";
import { HouseContext } from "../../contexts/HouseProvider";
import { InvoiceContext } from "../../contexts/InvoiceProvider";
import { FaPencilAlt } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { GiCheckMark } from "react-icons/gi";
import { deleteHouse, editHouse } from "../../api/house";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { Outlet } from "react-router-dom";
import { ROUTER } from "../../config/routers";

const HouseDetailLayout = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const [editHouseTemp, setEditHouseTemp] = useState({ name: "" });
  const [houseStatus, setHouseStatus] = useState(false);
  const { houseId } = useParams();

  const houseProvider = useContext(HouseContext);
  const invoiceProvider = useContext(InvoiceContext);

  useEffect(
    () =>
      setEditHouseTemp(
        houseProvider.houseList.find((item) => item.id === parseInt(houseId))
      ),
    [houseProvider.houseList, houseId]
  );

  const handleRemoveInvoiceOfHouse = (houseId) => {
    let invoicesTemp = [];
    invoicesTemp = invoiceProvider.invoiceList.filter(
      (item) => item.houseId === houseId
    );
    Promise.all(
      invoicesTemp.map((invoice) =>
        houseProvider.handleRemoveInvoice(invoice.id)
      )
    ).then((invoicesTemp = []));
  };

  const handleRemoveHouse = (id) => {
    handleRemoveInvoiceOfHouse(id);
    loadingProvider.setStatusLoading(true);
    deleteHouse(id)
      .then(() => {
        let currentList = houseProvider.houseList;
        currentList = currentList.filter((item) => item.id !== id);
        houseProvider.setHouseList(currentList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };
  const setHouseTempBeforeEdit = (e) => {
    setEditHouseTemp({
      ...editHouseTemp,
      name: e.target.value,
    });
  };
  const handleEditHouse = (house) => {
    loadingProvider.setStatusLoading(true);
    editHouse(house)
      .then((house) => {
        let currentList = houseProvider.houseList;
        currentList = currentList.map((item) => {
          if (item.id === house.id) {
            item.name = house.name;
          }
          return item;
        });
        houseProvider.setHouseList(currentList);
        setHouseStatus(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };
  return (
    <>
      <div className="container t-cen header-logo-container">
        <div className="header-logo f-row f-cen">
          <Link to={ROUTER.home}>
            <BsHouse className="edit-house-icon" />
          </Link>
          <h2>House's Infomation</h2>
        </div>
      </div>
      <div className="edit-container body-container">
        <div hidden={loadingProvider.statusLoading === false}>
          <Loading />
        </div>
        <div className="body-bar f-row f-cen f-around">
          <button onClick={() => handleRemoveHouse(editHouseTemp.id)}>
            <Link to={ROUTER.home}>
              <BsFillTrashFill fill="#446B50" />
            </Link>
          </button>
          <div className="body-house-name-cover">
            <div className="body-house-name f-row f-col f-cen">
              <label htmlFor="houseName"> House's Name</label>

              <input
                onClick={() => setHouseStatus(true)}
                onChange={(e) => setHouseTempBeforeEdit(e)}
                id="houseName"
                type="text"
                value={editHouseTemp ? editHouseTemp.name : "..."}
                className="t-cen"
              />
            </div>
          </div>
          <button>
            {houseStatus === false && <FaPencilAlt />}
            {houseStatus === true && (
              <GiCheckMark onClick={() => handleEditHouse(editHouseTemp)} />
            )}
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
};
export default HouseDetailLayout;
