import React from "react";

const LoginRegisterFooter = () => {
  return (
    <div className="text-center w-2/5 text-white text-sm absolute left-0 right-0 ml-auto mr-auto bottom-3">
      <div className="flex justify-between ">
        <p>Term of Service</p>
        <p>Privacy</p>
        <p>Cookies</p>
        <p>Cookies Preferrences</p>
      </div>
      <div className="py-2 before:content-['\A9']">2023 Tonytech.io</div>
    </div>
  );
};

export default LoginRegisterFooter;
