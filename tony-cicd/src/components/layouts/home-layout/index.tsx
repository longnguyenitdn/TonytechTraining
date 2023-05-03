import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsChevronExpand } from "react-icons/bs";
import NewTeamModal from "@/components/layouts/home-layout/home-header/components/new-team-modal";
import { useAppSelector } from "@/redux/store";
import { loginUserSelector } from "@/redux/selector/user.selector";
import ProjectIntro from "@/components/project-intro";
import { projectsSelector } from "@/redux/selector/project.selector";
import ProjectList from "@/components/project-list";

const HomeLayout = () => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const userLogin = useAppSelector(loginUserSelector);
  const projects = useAppSelector(projectsSelector);
  return (
    <div>
      <div className="flex justify-between border-b  bg-slate-50 ">
        <div
          onClick={() => setIsAdd(true)}
          className="flex items-center  hover:bg-gray-200 rounded-lg relative h-10 m-3"
        >
          <div className="cursor-pointer flex items-center px-2">
            <FaUserCircle className="text-[#79589f] text-2xl" />
            <span className="text-[#79589f] p-1 text-sm font-normal mx-1">
              {userLogin.name}
            </span>
            <BsChevronExpand className="fill-[#79589f]" />
          </div>
          {isAdd === true && <NewTeamModal setIsAdd={setIsAdd} />}
        </div>
        <div className="flex border border-[#79589f] items-center rounded h-8 p-1 m-5 px-2 hover:bg-gray-200 cursor-pointer">
          <span className="text-[#79589f] px-1 text-sm font-normal">New</span>
          <BsChevronExpand className="fill-[#79589f]" />
        </div>
      </div>
      {projects?.length === 0 ? (
        <ProjectIntro />
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  );
};

export default HomeLayout;
