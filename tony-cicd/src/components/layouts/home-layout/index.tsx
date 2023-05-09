import React, { useState } from "react";

import { BsChevronExpand } from "react-icons/bs";
import NewTeamModal from "@/components/layouts/home-layout/home-header/components/new-team-modal";
import { useAppSelector } from "@/redux/store";
import TeamIntro from "@/components/team-intro";
import { teamsSelector } from "@/redux/selector/team.selector";

const HomeLayout = () => {
  const [isAddTeam, setIsAddTeam] = useState(false);

  const teams = useAppSelector(teamsSelector);
  return (
    <div>
      <div className="flex justify-between border-b  bg-slate-50 items-center">
        <div
          onClick={() => setIsAddTeam(true)}
          className="flex items-center  hover:bg-gray-200 rounded-lg relative h-10 m-3"
        >
          <div className="cursor-pointer flex items-center px-2">
            <span className="text-[#79589f] p-1 text-sm font-normal">
              Select Team
            </span>
            <BsChevronExpand className="fill-[#79589f]" />
          </div>
          {isAddTeam === true && <NewTeamModal setIsAdd={setIsAddTeam} />}
        </div>
      </div>
      {teams?.length === 0 ? (
        <TeamIntro />
      ) : (
        <h1 className="text-[56px] text-center p-5">Welcome to CICD</h1>
      )}
    </div>
  );
};

export default HomeLayout;
