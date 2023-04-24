import Loading from "@/components/loading";
import { settingSelector } from "@/redux/selector/setting.selector";
import React from "react";
import { useSelector } from "react-redux";
type LoginRegisterLayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LoginRegisterLayoutProps) => {
  const loadingStatus = useSelector(settingSelector);

  return (
    <>
      {" "}
      {loadingStatus === true && <Loading />}
      {children}
    </>
  );
};

export default Layout;
