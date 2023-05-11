import NewProjectModal from "@/components/layouts/home-layout/home-header/components/new-project-modal";
import TeamMember from "@/components/team-member";
import { fetchATeam } from "@/redux/actions/team.action";

import { teamSelector } from "@/redux/selector/team.selector";
import { useAppDispatch } from "@/redux/store";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BsChevronExpand } from "react-icons/bs";
import { useSelector } from "react-redux";
const TeamId = () => {
  const router = useRouter();
  const teamId = Number(router.query.teamId);

  const [isAddProject, setIsAddProject] = useState(false);
  const team = useSelector(teamSelector);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchATeam(teamId));
  }, []);
  return (
    <>
      <div className="flex justify-between border-b  bg-slate-50 items-center">
        <div
          onClick={() => setIsAddProject(true)}
          className="flex items-center rounded h-8 p-1 m-5 px-2 hover:bg-gray-200 cursor-pointer relative"
        >
          <span className="text-[#79589f] px-1 text-sm font-normal">
            New Project
          </span>
          <BsChevronExpand className="fill-[#79589f]" />
          {isAddProject === true && (
            <NewProjectModal setIsAddProject={setIsAddProject} />
          )}
        </div>
        <div className="flex items-center text-[#79589f] mx-5 text-base font-semibold  px-2 py-1">
          <div className="border rounded-[50%] border-[#79589f] p-1 mx-1">
            <AiOutlineTeam className="text-base" />
          </div>
          <p className="font-normal">Team: {team?.name}</p>
        </div>
      </div>
      <div className="px-3">
        <div className="flex items-center border w-96 px-2 my-5 py-1 rounded">
          <BsSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Filter member"
            className="px-2 outline-none w-full"
          />
        </div>
      </div>
      <TeamMember teamId={teamId} />
    </>
  );
};

export default TeamId;
