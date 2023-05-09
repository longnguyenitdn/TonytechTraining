import React from "react";
import { toast } from "react-toastify";
import NewProjectForm from "@/components/new-project-form";
import { loginUserSelector } from "@/redux/selector/user.selector";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IProject } from "@/types/project.type";

import { useRouter } from "next/router";
import { ROUTER } from "@/config/routers";
import { addNewProject } from "@/redux/actions/project.action";

const NewProject = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector(loginUserSelector);
  const handleAddProject = async (project: IProject) => {
    const repponse = await dispatch(addNewProject(project)).unwrap();
    if (repponse.error) {
      toast.error("Add New Fail, Opp!");
    } else {
      toast.success("Add New Success");
      router.push(ROUTER.home);
    }
  };

  return (
    <>
      <NewProjectForm
        userLogin={userLogin}
        handleAddProject={handleAddProject}
      />
    </>
  );
};

export default NewProject;
