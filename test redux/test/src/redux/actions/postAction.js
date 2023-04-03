import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
} from "../constants/postConstant";
export const loadPost = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_POST_REQUEST,
    });
    const url = "https://jsonplaceholder.typicode.com/posts";
    const reponse = await fetch(url);
    const respondBody = await reponse.json();

    dispatch({
      type: FETCH_POST_SUCCESS,
      data: respondBody,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};
