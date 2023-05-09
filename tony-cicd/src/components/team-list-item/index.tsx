import { ROUTER, getRouter } from "@/config/routers";
import { ITeam } from "@/types/team.type";
import Link from "next/link";
import React from "react";
import { HiUserGroup } from "react-icons/hi2";
type ITeamProps = {
  key?: number;
  team: ITeam;
};
const TeamListIteam = (props: ITeamProps) => {
  const teamDetailLink = getRouter(ROUTER.teamDetail, {
    teamId: String(props.team.id),
  });
  return (
    <Link href={teamDetailLink}>
      <div className="flex justify-between items-center text-[#79589f] px-3 py-2 text-sm bg-violet-50 my-1 hover:bg-violet-100 cursor-pointer">
        <div className="flex items-center">
          <HiUserGroup className="fill-[#79589f] mr-3" />
          <p>{props.team.name}</p>
        </div>
        <p>admin</p>
      </div>
    </Link>
  );
};

export default TeamListIteam;
