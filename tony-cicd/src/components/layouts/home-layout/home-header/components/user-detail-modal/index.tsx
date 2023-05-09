import React from "react";
import { ClickAwayListener } from "react-advanced-click-away";
import { FaUserSecret } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { AiTwotoneSetting, AiFillBell } from "react-icons/ai";
import { IUser } from "@/types/user.type";
type ITeamOptionModalProps = {
  setIsOpenModal: (isOpenModal: boolean) => void;
  logOut: () => void;
  userLogin: IUser;
};
const UserDetailModal = (props: ITeamOptionModalProps) => {
  return (
    <ClickAwayListener onClickAway={() => props.setIsOpenModal(false)}>
      <div className="absolute w-[180px] top-[59px] right-3 border border-slate-300 bg-white rounded-md shadow-[0_3px_20px_0px_rgba(89,105,129,.3)]">
        <div className="flex flex-col justify-center items-center border-b py-5 px-16 hover:bg-gray-100 cursor-pointer">
          <button className=" rounded-[50%] bg-slate-300 w-12 h-12 flex items-center justify-center">
            <FaUserSecret className="text-3xl text-white" />
          </button>
          <p className="mt-1 text-base">{props.userLogin.name}</p>
          <p className="mt-1 text-sm text-slate-400">{props.userLogin.email}</p>
        </div>
        <div className="flex items-center border-b px-4 py-3 text-[#79589f] font-normal text-sm hover:bg-gray-100 cursor-pointer">
          <AiTwotoneSetting className="mr-3 text-xl" />
          Account Setting
        </div>
        <div className="flex items-center border-b px-4 py-3 text-[#79589f] font-normal text-sm hover:bg-gray-100 cursor-pointer">
          <AiFillBell className="mr-3 text-xl" />
          Notification
        </div>
        <div
          onClick={props.logOut}
          className="flex items-center px-4 py-3 text-[#79589f] font-normal text-sm hover:bg-gray-100 cursor-pointer"
        >
          <BiLogOut className="mr-3 text-xl" />
          Log out
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default UserDetailModal;
