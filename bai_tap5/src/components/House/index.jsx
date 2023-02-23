import React from "react";
import { BsHouse } from "react-icons/bs";
import { Link } from "react-router-dom";

const House = (props) => {
  const house = props.item;
  return (
    <div className="house-cover f-col f-cen">
      <Link to={`/house/${house.id}`}>
        <button className="house-icon">
          <BsHouse />
        </button>
      </Link>
      <p className="house-name">{house.name}</p>
    </div>
  );
};
export default House;
