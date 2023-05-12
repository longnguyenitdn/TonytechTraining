import { getUserTeamByTeamId } from "@/api/user-team";
import { fetchUserTeamByTeamId } from "@/redux/actions/userTeam.action";

import { useAppDispatch, useAppSelector } from "@/redux/store";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Member from "./member";
import { userTeamsSelector } from "@/redux/selector/userTeam.selector";
import { IUserTeam } from "@/types/user-team.type";

const TeamMemberList = () => {
  const router = useRouter();
  const teamId = router.query.teamId;
  const dispatch = useAppDispatch();
  const userTeams = useAppSelector(userTeamsSelector);

  useEffect(() => {
    dispatch(fetchUserTeamByTeamId(Number(teamId)));
  }, []);

  return (
    <div className="py-5 px-5">
      {userTeams?.map((userTeam: IUserTeam, index: number, _) => (
        <Member
          key={index}
          user={userTeam.user?.email}
          index={index}
          role={userTeam.role}
        />
      ))}
    </div>
  );
};

export default TeamMemberList;
