import HomeHeader from "@/components/layouts/home-layout/home-header";
import NewTeamForm from "@/components/new-team-form";
import { loginUserSelector } from "@/redux/selector/user.selector";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ITeam } from "@/types/team.type";
import { ToastContainer, toast } from "react-toastify";

import React from "react";
import { useRouter } from "next/router";
import { ROUTER } from "@/config/routers";
import { addNewTeam } from "@/redux/actions/team.action";

const NewTeam = () => {
  const router = useRouter();
  const userLogin = useAppSelector(loginUserSelector);
  const dispatch = useAppDispatch();
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
  const handleAddTeam = async (team: ITeam) => {
    const repponse = await dispatch(addNewTeam(team)).unwrap();
    if (repponse.error) {
      setFailNotification();
    } else {
      router.push(ROUTER.home);
    }
  };

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

      <NewTeamForm userLogin={userLogin} handleAddTeam={handleAddTeam} />
    </>
  );
};

export default NewTeam;
