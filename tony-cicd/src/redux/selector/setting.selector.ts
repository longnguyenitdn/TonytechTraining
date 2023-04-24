export const settingSelector = (state: {
  setting: { loadingStatus: boolean };
}) => state.setting?.loadingStatus;
