import React from "react";
import "../../style/home/index.scss";

import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <Outlet />
    </div>
  );
};
export default Home;
