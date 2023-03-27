import { useEffect, useState } from "react";

const UserPostForm = (props) => {
  const [post, setPost] = useState({
    id: "",
    decription: "",
    photo: "",
    userId: parseInt(props.userId),
    createAt: "",
  });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const onChangeImage = async (e) => {
    if (e.target.files.length) {
      const photo = await toBase64(e.target.files[0]);
      setPost({ ...post, photo: photo });
    }
  };
  const setDateCreate = () => {
    return new Promise((rs, rj) => {
      const date = new Date().toLocaleString();
      setPost({ ...post, createAt: date });
      rs({ ...post, createAt: date });
    });
  };
  const onSubmitHandleAddPost = async () => {
    const newPost = await setDateCreate();
    props.handleAddpost(newPost);
  };
  const onSubmitHandleUpdatePost = async () => {
    const newPost = await setDateCreate();
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
            <img id="img-preview" src={post ? post.photo : ""} alt="..." />
            <div className="upload-photo-btn flexr">
              <label htmlFor="file-input">Upload Image</label>
              <input
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
