export default function posts(state = [], action) {
  switch (action.type) {
    case "posts/addPost":
      return [action.payload, ...state];

    case "posts/fetchPost":
      return action.payload;

    case "posts/removePost":
      return [...state.filter((post) => post.id !== action.payload)];

    case "posts/updatePost":
      return [
        ...state.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        }),
      ];

    default:
      return state;
  }
}
