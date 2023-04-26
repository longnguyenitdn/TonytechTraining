import { ITeam } from "@/types/team.type";
import React from "react";
import { HiUserGroup } from "react-icons/hi2";
type ITeamProps = {
  key?: number;
  team: ITeam;
};
const Team = (props: ITeamProps) => {
  return (
    <div className="flex justify-between items-center text-[#79589f] px-3 py-2 text-sm bg-violet-50 my-1 hover:bg-violet-100 cursor-pointer">
      <div className="flex items-center">
        <HiUserGroup className="fill-[#79589f] mr-3" />
        <p>{props.team.name}</p>
      </div>
      <p>admin</p>
    </div>
  );
};

export default Team;
