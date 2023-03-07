import React from "react";

import { HouseContext } from "../../contexts/HouseProvider";
import { useContext } from "react";
import HouseForm from "../../components/houseForm";
const HouseNew = () => {
  const houseProvider = useContext(HouseContext);
  const handleHouseSubmit = (house) => {
    houseProvider.handleAddNewHouse(house);
  };
  return <HouseForm handleHouseSubmit={handleHouseSubmit} />;
};
export default HouseNew;
