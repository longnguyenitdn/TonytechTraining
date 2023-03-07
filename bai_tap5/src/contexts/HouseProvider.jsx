import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { getHouse } from "../api/house";
import { LoadingContext } from "./LoadingProvider";
import { addNewHouse } from "../api/house";
import { deleteHouse, editHouse } from "../api/house";

export const HouseContext = createContext();
const HouseProvider = (props) => {
  const loadingProvider = useContext(LoadingContext);

  const [houseList, setHouseList] = useState([]);

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

  const handleAddNewHouse = (house) => {
    if (house.name !== "") {
      loadingProvider.setStatusLoading(true);
      addNewHouse(house)
        .then((data) => {
          setHouseList([data, ...houseList]);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loadingProvider.setStatusLoading(false);
        });
    }
  };

  const handleRemoveHouse = (id) => {
    return new Promise((rs, rj) => {
      loadingProvider.setStatusLoading(true);
      deleteHouse(id)
        .then(() => {
          setHouseList(houseList.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.log(error);
          rj(error);
        })
        .finally(() => {
          loadingProvider.setStatusLoading(false);
          rs(id);
        });
    });
  };

  const handleEditHouse = (house) => {
    loadingProvider.setStatusLoading(true);
    editHouse(house)
      .then((house) => {
        setHouseList(
          houseList.map((item) => {
            if (item.id === house.id) {
              return {
                ...item,
                name: house.name,
              };
            }
            return item;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  };
  return (
    <HouseContext.Provider
      value={{
        houseList: houseList,
        setHouseList: setHouseList,
        handleAddNewHouse: handleAddNewHouse,
        handleRemoveHouse: handleRemoveHouse,
        handleEditHouse: handleEditHouse,
      }}
    >
      {props.children}
    </HouseContext.Provider>
  );
};
export default HouseProvider;
