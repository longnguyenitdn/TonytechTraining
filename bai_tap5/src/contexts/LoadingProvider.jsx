import React from "react";
import { useState, createContext } from "react";
export const LoadingContext = createContext();
const LoadingProvider = (props) => {
  const [statusLoading, setStatusLoading] = useState(null);
  return (
    <LoadingContext.Provider
      value={{
        statusLoading: statusLoading,
        setStatusLoading: setStatusLoading,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};
export default LoadingProvider;
