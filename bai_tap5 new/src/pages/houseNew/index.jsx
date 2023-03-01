import React from "react";
import { LoadingContext } from "../../contexts/LoadingProvider";
import { HouseContext } from "../../contexts/HouseProvider";
import { useContext } from "react";
import HouseForm from "../../components/houseForm";
const HouseNew = () => {
  const loadingProvider = useContext(LoadingContext);
  const houseProvider = useContext(HouseContext);
  return (
    <HouseForm
      loadingProvider={loadingProvider}
      houseProvider={houseProvider}
    />
  );
};
export default HouseNew;
