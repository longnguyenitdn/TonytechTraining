import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_NEW_TEAM } from "../constants/team.constant";
import { setLoading } from "../reducers/setting.slice";
import { addTeam } from "@/api/team";
import { ITeam } from "@/types/team.type";
import { newTeam } from "../reducers/team.slice";

export const addNewTeam = createAsyncThunk(
  ADD_NEW_TEAM,
  async (team: ITeam, { dispatch }) => {
    let reponse: {
      error?: boolean | unknown;
    } = {};
    try {
      dispatch(setLoading(true));
      const res = await addTeam(team);
      dispatch(newTeam(res));
      reponse = {
        error: false,
      };
    } catch (err) {
      console.log(err);
      reponse = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return reponse;
  }
);
