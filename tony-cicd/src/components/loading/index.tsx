import React from "react";
const Loading = () => {
  return (
    <div className="absolute w-full h-full z-100">
      <div className="absolute w-full h-full z-101 top-0 left-0 bg-[rgba(0, 0, 0, 0.53)] opacity-70 "></div>
      <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-102">
        <img className="w-32" src="/1uoA-unscreen.gif" alt="loading" />
      </div>
    </div>
  );
};
export default Loading;
