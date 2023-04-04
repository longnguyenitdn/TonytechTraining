import { SET_LOADING } from "../constant/setting.constant";

export default function settingLoading(
  state = { loadingStatus: false },
  action
) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loadingStatus: action.payload };

    default:
      return state;
  }
}
