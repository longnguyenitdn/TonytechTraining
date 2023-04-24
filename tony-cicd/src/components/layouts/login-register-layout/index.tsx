import React from "react";
type LoginRegisterLayoutProps = {
  children: React.ReactNode;
};
const LoginRegisterLayout = ({ children }: LoginRegisterLayoutProps) => {
  return (
    <div className="h-14 bg-gradient-to-b from-purple-800 to-indigo-800 w-full h-screen flex flex-col items-center ">
      {children}
    </div>
  );
};

export default LoginRegisterLayout;
