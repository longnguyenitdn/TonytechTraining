import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { getHouse } from "../api/house";
import { LoadingContext } from "./LoadingProvider";
export const HouseContext = createContext();
const HouseProvider = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const [houseList, setHouseList] = useState([]);
  const [houseId, setHouseId] = useState(null);

  useEffect(() => {
    loadingProvider.setStatusLoading(true);
    getHouse()
      .then((data) => {
        setHouseList(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HouseContext.Provider
      value={{
        houseList: houseList,
        setHouseList: setHouseList,
        houseId: houseId,
        setHouseId: setHouseId,
      }}
    >
      {props.children}
    </HouseContext.Provider>
  );
};
export default HouseProvider;
