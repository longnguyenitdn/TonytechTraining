export default function posts(
  state = {
    userPosts: [],
    publicPosts: [],
  },
  action
) {
  switch (action.type) {
    case "posts/addPost":
      return { ...state, userPosts: [action.payload, ...state.userPosts] };
    case "posts/fetchPost":
      return { ...state, publicPosts: action.payload };
    case "posts/fetchUserPost":
      return { ...state, userPosts: action.payload };
    case "posts/removePost":
      return {
        ...state,
        userPosts: [
          ...state.userPosts.filter((post) => post.id !== action.payload),
        ],
      };
    case "posts/updatePost":
      return {
        ...state,
        userPosts: [
          ...state.userPosts.map((post) => {
            if (post.id === action.payload.id) {
              return action.payload;
            }
            return post;
          }),
        ],
      };

    default:
      return state;
  }
}
