import {
  POSTS_ADDPOST,
  POSTS_FETCHPOST,
  POSTS_FETCHUSERPOST,
  POSTS_REMOVEPOST,
  POSTS_SETPOST,
  POSTS_UPDATEPOST,
} from "../constant/posts.constant";

export default function posts(
  state = {
    userPosts: [],
    publicPosts: [],
    post: {},
  },
  action
) {
  switch (action.type) {
    case POSTS_ADDPOST:
      return { ...state, userPosts: [action.payload, ...state.userPosts] };
    case POSTS_FETCHPOST:
      return { ...state, publicPosts: action.payload };
    case POSTS_FETCHUSERPOST:
      return { ...state, userPosts: action.payload };
    case POSTS_REMOVEPOST:
      return {
        ...state,
        userPosts: [
          ...state.userPosts.filter((post) => post.id !== action.payload),
        ],
      };
    case POSTS_UPDATEPOST:
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
    case POSTS_SETPOST:
      return { ...state, post: action.payload };

    default:
      return state;
  }
}
