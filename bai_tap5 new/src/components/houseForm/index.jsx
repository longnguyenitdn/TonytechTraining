import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTER } from "../../config/routers";

const HouseForm = (props) => {
  const [house, setHouse] = useState({
    name: "",
  });
  const setInputHouseName = (e) => {
    return setHouse({ ...house, name: e.target.value });
  };
  const checkHouseBeforeSubmit = (house) => {
    if (house.name !== "") {
      props.handleHouseSubmit(house);
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
          onClick={() => checkHouseBeforeSubmit(house)}
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
