import { myFetch } from "./myFetch";

const getPost = () => {
  return myFetch("/posts?_expand=user", "GET");
};
const addPost = (post) => {
  const link = "/posts";
  const option = "POST";
  return myFetch(link, option, post);
};
const editPost = (post) => {
  let link = `/posts/${post.id}`;
  let method = "PUT";
  return myFetch(link, method, post);
};
const deletePost = (id) => {
  const link = `/posts/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};
export { addPost, editPost, deletePost, getPost };
