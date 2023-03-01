import React from "react";
import { useState } from "react";
import { addNewHouse } from "../../api/house";
import { Link } from "react-router-dom";
import { ROUTER } from "../../config/routers";

const HouseForm = (props) => {
  const [house, setHouse] = useState({
    name: "",
  });
  const setInputHouseName = (e) => {
    return setHouse({ ...house, name: e.target.value });
  };
  const handleAddNewHouse = (house) => {
    if (house.name !== "") {
      props.loadingProvider.setStatusLoading(true);
      addNewHouse(house)
        .then((data) => {
          props.houseProvider.setHouseList([
            data,
            ...props.houseProvider.houseList,
          ]);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          props.loadingProvider.setStatusLoading(false);
        });
    }
  };
  return (
    <div className="add-new">
      <label htmlFor="houseName">Đặt tên cho nhà mới</label>
      <input
        className="input-style"
        defaultValue={""}
        onChange={(e) => setInputHouseName(e)}
        type="text"
        placeholder="Nhập tên ngôi nhà vào đây"
      />
      <p hidden={house.name !== ""}>Vui lòng không để trống tên</p>
      <div className="f-row f-around ">
        <button
          onClick={() => handleAddNewHouse(house)}
          className="btn-add-new-house"
        >
          <Link to={house.name !== "" ? ROUTER.home : ROUTER.houseNew}>
            Tạo mới
          </Link>
        </button>
        <button className="btn-add-new-house">
          <Link to={ROUTER.home}>Hủy bỏ</Link>
        </button>
      </div>
    </div>
  );
};

export default HouseForm;
