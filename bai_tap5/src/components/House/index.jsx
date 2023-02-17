import React from "react";
import { BsHouse } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { HouseContext } from "../../contexts/HouseProvider";

const House = (props) => {
  const houseProvider = useContext(HouseContext);
  const house = props.item;
  return (
    <div className="house-cover f-col f-cen">
      <Link to={"/house"}>
        <button
          className="house-icon"
          onClick={() => houseProvider.setHouseId(house.id)}
        >
          <BsHouse />
        </button>
      </Link>
      <p className="house-name">{house.name}</p>
    </div>
  );
};
export default House;
