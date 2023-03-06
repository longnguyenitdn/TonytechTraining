import React from "react";
import House from "../../components/house";
import { HouseContext } from "../../contexts/HouseProvider";
import { useContext } from "react";
import { ROUTER } from "../../config/routers";

import { Link } from "react-router-dom";
const Houses = (props) => {
  const houseProvider = useContext(HouseContext);

  return (
    <>
      <div className="body-content f-row">
        {houseProvider.houseList.map((item) => {
          return <House item={item} key={item.id} />;
        })}
      </div>
      <button className="btn-add-house-cover">
        <Link to={ROUTER.houseNew}>
          <img
            className="btn-add-house "
            src="/house-add-svgrepo-com (2).png"
            alt="File not found"
          />
        </Link>
      </button>
    </>
  );
};

export default Houses;
