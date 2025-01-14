import HomeHeader from "@/components/layouts/home-layout/home-header";
import NewTeamForm from "@/components/new-team-form";
import { loginUserSelector } from "@/redux/selector/user.selector";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ITeam } from "@/types/team.type";
import { toast } from "react-toastify";

import React from "react";
import { useRouter } from "next/router";
import { ROUTER } from "@/config/routers";
import { addNewTeam } from "@/redux/actions/team.action";
import { addUserTeam } from "@/api/user-team";

const NewTeam = () => {
  const router = useRouter();
  const userLogin = useAppSelector(loginUserSelector);
  const dispatch = useAppDispatch();

  const handleAddTeam = async (team: ITeam) => {
    const repponse = await dispatch(addNewTeam(team)).unwrap();
    if (repponse.error) {
      toast.error("Add New Fail, Opp!");
    } else {
      await addUserTeam({
        userId: userLogin.id,
        teamId: repponse.team?.id,
        role: "admin",
      });
      toast.success("Add New Success");
      router.push(ROUTER.home);
    }
  };

  return (
    <>
      <NewTeamForm userLogin={userLogin} handleAddTeam={handleAddTeam} />
    </>
  );
};

export default NewTeam;
