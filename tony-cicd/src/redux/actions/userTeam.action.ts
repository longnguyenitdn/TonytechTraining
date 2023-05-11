import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADD_NEW_USERTEAM,
  FETCH_USERTEAM_BY_TEAMID,
  FETCH_USERTEAM_BY_USERID,
} from "../constants/userTeam.constant";
import { IUserTeam } from "@/types/user-team.type";
import { setLoading } from "../reducers/setting.slice";
import {
  addUserTeam,
  getUserTeamByTeamId,
  getUserTeamByUserId,
} from "@/api/user-team";

export const fetchUserTeamByUserId = createAsyncThunk(
  FETCH_USERTEAM_BY_USERID,
  async (userId: number, { dispatch }) => {
    let res: {
      userTeams?: IUserTeam[];
      error?: boolean | unknown;
    };
    try {
      dispatch(setLoading(true));
      const userTeams = await getUserTeamByUserId(userId);
      res = {
        userTeams: userTeams,
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
export const fetchUserTeamByTeamId = createAsyncThunk(
  FETCH_USERTEAM_BY_TEAMID,
  async (teamId: number, { dispatch }) => {
    let res: {
      userTeams?: IUserTeam[];
      error?: boolean | unknown;
    };
    try {
      dispatch(setLoading(true));
      const userTeams = await getUserTeamByTeamId(teamId);

      res = {
        userTeams: userTeams,
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

export const addNewUserTeam = createAsyncThunk(
  ADD_NEW_USERTEAM,
  async (userTeam: IUserTeam, { dispatch }) => {
    let reponse: {
      error?: boolean | unknown;
    } = {};
    try {
      dispatch(setLoading(true));
      const res = await addUserTeam(userTeam);

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
