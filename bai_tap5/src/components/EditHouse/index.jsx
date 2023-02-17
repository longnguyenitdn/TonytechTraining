import React, { useContext, useState, useEffect } from "react";
import { BsHouse, BsFillTrashFill } from "react-icons/bs";
import { HouseContext } from "../../contexts/HouseProvider";
import { FaPencilAlt } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { deleteHouse, editHouse } from "../../api/house";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { Link } from "react-router-dom";

const EditHouse = () => {
  const houseProvider = useContext(HouseContext);
  const loadingProvider = useContext(LoadingContext);
  const [editHouseTemp, setEditHouseTemp] = useState({});
  const [houseStatus, setHouseStatus] = useState(false);

  const currentHouse = houseProvider.houseList.find(
    (item) => item.id === houseProvider.houseId
  );

  useEffect(() => {
    setEditHouseTemp(currentHouse);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRemoveHouse = (id) => {
    loadingProvider.setStatusLoading(true);
    deleteHouse(id)
      .then(() => {
        let currentList = houseProvider.houseList;
        currentList = currentList.filter((item) => item.id !== id);
        houseProvider.setHouseList(currentList);
        houseProvider.setHouseId(null);
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
          <BsHouse className="edit-house-icon" />
          <h1>House's Infomation</h1>
        </div>
      </div>
      <div className="container body-container">
        <div className="body-bar f-row f-cen f-around">
          <Link to={"/"}>
            <button onClick={() => handleRemoveHouse(currentHouse.id)}>
              <BsFillTrashFill />
            </button>
          </Link>
          <div className="body-house-name f-row f-col f-cen">
            <label htmlFor="houseName"> House's Name</label>
            <input
              onClick={() => setHouseStatus(true)}
              onChange={(e) => setHouseTempBeforeEdit(e)}
              id="houseName"
              type="text"
              defaultValue={`${currentHouse.name}`}
              className="t-cen"
            />
          </div>
          <button>
            {houseStatus === false && <FaPencilAlt />}
            {houseStatus === true && (
              <GiCheckMark onClick={() => handleEditHouse(editHouseTemp)} />
            )}
          </button>
        </div>
        <div className="edit-body-content-cover">
          <div className="body-invoiceTypes-cover container f-row f-around">
            <div className="body-invoiceType t-cen">Điện</div>
            <div className="body-invoiceType t-cen">Nước</div>
            <div className="body-invoiceType t-cen">Internet</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditHouse;
