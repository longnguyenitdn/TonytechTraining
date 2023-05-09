import { IProject } from "@/types/project.type";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillHexagonFill } from "react-icons/bs";
type IProjectProps = {
  key?: number;
  project: IProject;
};
const Project = (props: IProjectProps) => {
  return (
    <div className="p-2 border-b text-xl flex justify-between items-center hover:bg-gray-200 cursor-pointer">
      <div className="flex items-center">
        <BsFillHexagonFill className="fill-[#79589f]" />
        <p className="text-sm px-2">{props.project.name}</p>
      </div>
      <AiOutlineStar className="fill-gray-500 text-base" />
    </div>
  );
};

export default Project;
