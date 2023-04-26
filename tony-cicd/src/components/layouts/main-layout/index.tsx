import Loading from "@/components/loading";
import { settingSelector } from "@/redux/selector/setting.selector";
import React from "react";
import { useSelector } from "react-redux";
import HomeHeader from "../home-layout/home-header";
import { withUser } from "@/HOCs/team.HOC";
type LoginRegisterLayoutProps = {
  children?: React.ReactNode;
};
const Layout = ({ children }: LoginRegisterLayoutProps) => {
  const loadingStatus = useSelector(settingSelector);

  return (
    <>
      <HomeHeader /> {loadingStatus === true && <Loading />}
      {children}
    </>
  );
};

export default withUser(Layout);
