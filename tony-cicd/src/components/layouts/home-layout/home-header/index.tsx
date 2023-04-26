import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";
import { loginUserSelector } from "@/redux/selector/user.selector";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logOutUser } from "@/redux/actions/user.action";
import { useRouter } from "next/router";
import { ROUTER } from "@/config/routers";
import UserDetailModal from "./components/user-detail-modal";

const HomeHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userLogin = useAppSelector(loginUserSelector);
  const logOut = () => {
    dispatch(logOutUser());
    router.push(ROUTER.login);
  };
  return (
    <>
      <div className="flex w-full justify-between px-3 py-2 relative">
        <div>
          <img src="/tony-cicd-violet.png" alt="Not found" className="w-20" />
        </div>
        <div>
          <input
            type="text"
            placeholder="search"
            className="w-96 border border-slate-300 rounded outline-none px-2 py-1"
          />
        </div>
        <div className="flex ">
          <button className="mr-3 ">
            <CgMenuGridO className="text-3xl text-blue-300 " />
          </button>
          <button
            onClick={() => setIsOpenModal(true)}
            className=" rounded-[50%] bg-slate-300 w-10 h-10 flex items-center justify-center"
          >
            <FaUserSecret className="text-2xl text-white" />
          </button>
        </div>
      </div>
      {isOpenModal === true && (
        <UserDetailModal
          setIsOpenModal={setIsOpenModal}
          userLogin={userLogin}
          logOut={logOut}
        />
      )}
      <div className="h-[3px] bg-gradient-to-r from-violet-400 to-sky-400"></div>
    </>
  );
};

export default HomeHeader;
