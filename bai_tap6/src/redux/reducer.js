const initState = {
  users: [],
  newsList: [],
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "users/addUser":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "users/fetchData":
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
export default rootReducer;
