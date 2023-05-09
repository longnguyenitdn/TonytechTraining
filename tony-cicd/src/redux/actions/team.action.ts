import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADD_NEW_TEAM,
  FETCH_A_TEAM,
  FETCH_TEAM_BY_USER,
} from "../constants/team.constant";
import { setLoading } from "../reducers/setting.slice";
import { addTeam, getATeam, getTeamByUser } from "@/api/team";
import { ITeam } from "@/types/team.type";
import { newTeam, setTeam } from "../reducers/team.slice";

export const addNewTeam = createAsyncThunk(
  ADD_NEW_TEAM,
  async (team: ITeam, { dispatch }) => {
    let reponse: {
      error?: boolean | unknown;
      team?: ITeam;
    } = {};
    try {
      dispatch(setLoading(true));
      const res = await addTeam(team);

      dispatch(newTeam(res));
      reponse = {
        error: false,
        team: res,
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
export const fetchTeamByUser = createAsyncThunk(
  FETCH_TEAM_BY_USER,
  async (userId: number, { dispatch }) => {
    let res: {
      teams?: ITeam[];
      error?: boolean | unknown;
    };
    try {
      dispatch(setLoading(true));
      const teams = await getTeamByUser(userId);
      res = {
        teams: teams,
        error: false,
      };
    } catch (err) {
      console.log(err);
      res = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const fetchATeam = createAsyncThunk(
  FETCH_A_TEAM,
  async (id: number, { dispatch }) => {
    let reponse: {
      error?: boolean | unknown;
    } = {};
    try {
      dispatch(setLoading(true));
      const res = await getATeam(id);

      dispatch(setTeam(res));
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
