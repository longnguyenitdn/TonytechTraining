import {
  FETCH_POST_SUCCESS,
  FETCH_POST_REQUEST,
  FETCH_POST_ERROR,
} from "../constants/postConstant";

const initState = {
  requesting: false,
  success: false,
  message: null,
  data: null,
};
export default function postReducer(state = initState, payload) {
  switch (payload.type) {
    case FETCH_POST_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload.data,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };

    default:
      return state;
  }
}
