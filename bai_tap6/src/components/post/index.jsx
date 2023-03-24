import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTER, getRouter } from "../../config/routers";

import { CiMenuKebab } from "react-icons/ci";
import {
  HeartTwoTone,
  MessageTwoTone,
  BranchesOutlined,
} from "@ant-design/icons";
import UserOptionModal from "./user-option-modal";
const Post = (props) => {
  const userId = window.localStorage.getItem("id");
  const [isOption, setIsOption] = useState(false);
  const post = props.post;

  const visitedUserLink = getRouter(ROUTER.userVisited, {
    visitedUserId: post?.userId,
  });

  return (
    <div className="post-wrap">
      <div className="post">
        <div className="post-cover">
          <div className="photo">
            <img src={post?.photo} alt="Something wrong. Loading..." />
          </div>
          <div className="decription">
            <p>{post?.decription}</p>
            <div className=" flexr flex-bet flex-cen">
              <h5 className="remove-link">
                {parseInt(userId) !== post.userId && (
                  <Link to={visitedUserLink}>Đăng bởi: {post.user?.name}</Link>
                )}
                {parseInt(userId) === post.userId &&
                  `Đăng bởi: ${post.user?.name}`}
              </h5>
              <button
                hidden={!props.optionStatus}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOption(true);
                }}
              >
                <CiMenuKebab />
                {isOption === true && (
                  <UserOptionModal
                    isOption={isOption}
                    post={post}
                    userId={userId}
                    setIsOption={setIsOption}
                    handleRemovePost={props.handleRemovePost}
                  />
                )}
              </button>
            </div>
            <p className="createAt">vào lúc: {post?.createAt}</p>
          </div>
        </div>
        <div className="photo-icon flexr flex-cen flex-around">
          <div>
            <HeartTwoTone twoToneColor="#eb2f96" />
          </div>
          <div className="middle">
            <MessageTwoTone />
          </div>
          <div>
            <BranchesOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
