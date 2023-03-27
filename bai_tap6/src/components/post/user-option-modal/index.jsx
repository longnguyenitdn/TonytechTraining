import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { ROUTER, getRouter } from "../../../config/routers";

const UserOptionModal = (props) => {
  const postUpdateLink = getRouter(ROUTER.userUpdatePost, {
    postId: props.post.id,
  });

  const wrapperRef = useRef(null);
  const handleClickOutside = (e) => {
    if (wrapperRef?.current.contains(e.target) === false) {
      props.setIsOption(false);
    } else {
      return;
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const onSubmitHandleRemovePost = (e) => {
    e.stopPropagation();

    props.handleRemovePost(props.post.id);
    props.setIsOption(false);
  };

  return (
    <div ref={wrapperRef} className="user-option-cover">
      <div className="user-option-content">
        <h4>Bạn đang muốn:</h4>
        <p className="remove-link">
          <Link to={postUpdateLink}>Chỉnh sửa bài đăng</Link>
        </p>
        <p onClick={onSubmitHandleRemovePost}> Xóa bài đăng</p>
      </div>
    </div>
  );
};
export default UserOptionModal;
