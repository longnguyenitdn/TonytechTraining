import React from "react";
import { BsSearch } from "react-icons/bs";
import { IProject } from "@/types/project.type";
import Project from "../project";
type IProjectList = {
  projects?: IProject[];
};
const ProjectList = (props: IProjectList) => {
  return (
    <>
      <div className="flex border-b px-3">
        <div className="p-1">Projects</div>
        <div className="p-1">Access</div>
        <div className="p-1">Billing</div>
        <div className="p-1">Settings</div>
      </div>
      <div className="px-3">
        <div className="flex items-center border w-96 px-2 my-5 py-1 rounded">
          <BsSearch className="text-gray-500" />
          <input type="text" placeholder="Filter projects" className="px-2" />
        </div>
      </div>
      <div>
        {props.projects?.map((project: IProject) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
