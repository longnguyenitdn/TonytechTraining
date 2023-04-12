import { useEffect, useState } from "react";
import { toBase64 } from "../../ultil";

const UserPostForm = (props) => {
  const [post, setPost] = useState({
    id: "",
    decription: "",
    photo: "",
    userId: parseInt(props.userId),
    createAt: "",
  });

  const onChangeImage = async (e) => {
    if (e.target.files.length) {
      const photo = await toBase64(e.target.files[0]);
      setPost({ ...post, photo: photo });
    }
  };
  const setDateCreate = () => {
    const date = new Date().toLocaleString();
    setPost({ ...post, createAt: date });
    return { ...post, createAt: date };
  };
  const onSubmitHandleAddPost = () => {
    const newPost = setDateCreate();
    props.handleAddpost(newPost);
  };
  const onSubmitHandleUpdatePost = () => {
    const newPost = setDateCreate();
    props.handleUpdatePost(newPost);
  };

  useEffect(() => {
    if (props.post) {
      setPost(props.post);
    }
  }, [props.post]);

  return (
    <>
      <textarea
        name="Text1"
        cols="40"
        rows="3"
        placeholder="Bạn đang nghĩ gì?"
        value={post.decription}
        onChange={(e) => setPost({ ...post, decription: e.target.value })}
      ></textarea>
      <div>
        <div className="container">
          <div className="preview flexc flex-cen">
            <label htmlFor="file-input">
              <img
                id="img-preview"
                src={
                  post.photo === "" ? "/add-g19a0fb01f_1280.png" : post.photo
                }
                alt=""
              />
            </label>
            <div className="upload-photo-btn flexr">
              <input
                hidden={true}
                onChange={onChangeImage}
                type="file"
                id="file-input"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onSubmitHandleAddPost}
        hidden={props.post ? true : false}
      >
        Đăng bài
      </button>
      <button
        onClick={onSubmitHandleUpdatePost}
        hidden={props.post ? false : true}
      >
        Xác nhận
      </button>
    </>
  );
};
export default UserPostForm;
