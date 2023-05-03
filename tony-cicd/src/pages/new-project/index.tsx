import React from "react";
import { ToastContainer, toast } from "react-toastify";
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
      setFailNotification();
    } else {
      router.push(ROUTER.home);
    }
  };
  const setFailNotification = () =>
    toast.error("Add New Fail, Opp!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NewProjectForm
        userLogin={userLogin}
        handleAddProject={handleAddProject}
      />
    </>
  );
};

export default NewProject;
