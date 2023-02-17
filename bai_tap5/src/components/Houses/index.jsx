import React from "react";
import House from "../House";
import { HouseContext } from "../../contexts/HouseProvider";
import { useContext } from "react";
import { VscDiffAdded } from "react-icons/vsc";
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
      <Link to={"/add"}>
        <VscDiffAdded className="btn-add-house" />
      </Link>
    </>
  );
};
export default Houses;
