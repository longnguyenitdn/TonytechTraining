import React, { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import Link from "next/link";
import { IUser } from "@/types/user.type";
import { ITeam } from "@/types/team.type";
type INewTeamFormProps = {
  userLogin: IUser;
  handleAddTeam: (team: ITeam) => void;
};
const NewTeamForm = (props: INewTeamFormProps) => {
  const [team, setTeam] = useState({
    name: "",
    ownerId: props.userLogin.id,
  });
  return (
    <>
      <div className="p-6 border-b text-base font-normal text-center bg-slate-50">
        Create new team
      </div>
      <div className="px-6">
        <div className="flex items-center p-3 justify-between border-b py-10">
          <div className="text-[#79589f] font-normal text-base">Team owner</div>
          <div className="flex items-center w-[650px]">
            <button className="rounded-[50%] bg-slate-300 w-12 h-12 flex items-center justify-center">
              <FaUserSecret className="text-3xl text-white " />
            </button>
            <div className="mx-5">
              <p className="text-base">{props.userLogin.name}</p>
              <p className="text-sm text-slate-400">{props.userLogin.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 justify-between border-b py-10">
          <div className="text-[#79589f] font-normal text-base">Team name</div>
          <div className="flex items-center w-[650px]">
            <input
              onChange={(e) => setTeam({ ...team, name: e.target.value })}
              type="text"
              className="w-[450px] rounded border border-slate-300 outline-none p-1"
            />
          </div>
        </div>
        <div className="flex justify-center p-8">
          <button className="bg-white border border-[#79589f] rounded  px-2 py-1 hover:bg-gray-100">
            <Link href={"/"} className="font-normal text-sm text-[#79589f]">
              Cancel
            </Link>
          </button>
          <button
            onClick={() => props.handleAddTeam(team)}
            className="bg-white border border-[#79589f] rounded font-normal text-sm text-[#79589f] px-2 py-1 ml-5 hover:bg-gray-100"
          >
            Create Team
          </button>
        </div>
      </div>
    </>
  );
};
export default NewTeamForm;
