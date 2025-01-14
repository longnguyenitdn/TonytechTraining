import React, { useEffect } from "react";
import { ClickAwayListener } from "react-advanced-click-away";
import { FaUserCircle } from "react-icons/fa";
import { ROUTER } from "@/config/routers";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

import { ITeam } from "@/types/team.type";
import { teamsSelector } from "@/redux/selector/team.selector";

import TeamListIteam from "../../../../../team-list-item";
type INewTeamModalProps = {
  setIsAdd: (isAdd: boolean) => void;
};
const NewTeamModal = (props: INewTeamModalProps) => {
  const teams = useAppSelector(teamsSelector);
  useEffect(() => {}, []);
  return (
    <ClickAwayListener onClickAway={() => props.setIsAdd(false)}>
      <div className="border border-gray-300 bg-white absolute top-10 left-0 rounded-md overflow-hidden shadow-[0_3px_20px_0px_rgba(89,105,129,.3)] ">
        <div className="flex p-2 bg-violet-50 items-center">
          <FaUserCircle className="fill-[#79589f] text-xl mx-2" />
          <p className="text-[#79589f] text-sm font-normal">Personal</p>
        </div>
        <div className="flex justify-between px-4 py-2 border-y">
          <span className="text-xs font-semibold text-gray-500">TEAMS</span>
          <span className="text-xs font-normal text-blue-600 cursor-pointer">
            <Link href={ROUTER.newTeam}>
              {" "}
              <span className="text-base"> + </span>
              New team
            </Link>
          </span>
        </div>
        <div className="p-5">
          <div className="border w-[300px] text-center rounded text-[#79589f]  text-sm">
            <p className="px-3 py-2 font-normal text-[#79589f] border-b">
              Team List
            </p>
            <div>
              {teams?.map((team: ITeam) => (
                <TeamListIteam key={team.id} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default NewTeamModal;
