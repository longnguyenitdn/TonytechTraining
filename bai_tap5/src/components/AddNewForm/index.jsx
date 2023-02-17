import React from "react";
import { useState, useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { HouseContext } from "../../contexts/HouseProvider";
import { addNewHouse } from "../../api/house";
import { Link } from "react-router-dom";

const AddNewForm = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const houseProvider = useContext(HouseContext);
  const [house, setHouse] = useState({
    name: "",
  });
  const setInputHouseName = (e) => {
    return setHouse({ ...house, name: e.target.value });
  };
  const handleAddNewHouse = (house) => {
    loadingProvider.setStatusLoading(true);
    addNewHouse(house)
      .then((data) => {
        houseProvider.setHouseList([data, ...houseProvider.houseList]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };
  return (
    <div className="add-new">
      <label htmlFor="houseName">Đặt tên cho nhà mới</label>
      <input
        defaultValue={""}
        onChange={(e) => setInputHouseName(e)}
        type="text"
        placeholder="Nhập tên ngôi nhà vào đây"
      />
      <p className="text-muted">Vui lòng nhập độ dài từ 4-8 kí tự</p>
      <div className="f-row f-bet ">
        <Link to={"/"}>
          <button
            onClick={() => handleAddNewHouse(house)}
            className="btn-add-new-house"
          >
            Tạo mới
          </button>
        </Link>
        <Link to={"/"}>
          <button className="btn-add-new-house">Hủy bỏ</button>
        </Link>
      </div>
    </div>
  );
};

export default AddNewForm;
