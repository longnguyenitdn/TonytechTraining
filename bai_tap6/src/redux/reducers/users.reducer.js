export default function users(state = [], action) {
  switch (action.type) {
    case "users/addUser":
      return [...state, action.payload];

    case "users/fetchUser":
      return action.payload;

    default:
      return state;
  }
}
