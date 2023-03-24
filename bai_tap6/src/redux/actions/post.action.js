export const addNewPost = (data) => {
  return {
    type: "posts/addPost",
    payload: data,
  };
};
export const removePost = (data) => {
  return {
    type: "posts/removePost",
    payload: data,
  };
};
export const updatePost = (data) => {
  return {
    type: "posts/updatePost",
    payload: data,
  };
};

export const fetchPost = (data) => {
  return {
    type: "posts/fetchPost",
    payload: data,
  };
};
