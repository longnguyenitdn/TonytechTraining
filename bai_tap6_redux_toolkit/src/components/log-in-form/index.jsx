import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useState } from "react";

import { ROUTER } from "../../config/routers";

const LogInForm = (props) => {
  const [loginUser, setLoginUser] = useState({
    account: "",
    pass: "",
  });

  const loginToUser = (e) => {
    e.preventDefault();
    props.onSubmitGetUser(loginUser.account, loginUser.pass);
  };

  return (
    <form action="#" onSubmit={loginToUser}>
      <div className="flexc flex-cen login-com">
        <h3>Đăng nhập vào TonyBook</h3>
        <div className="flexr flex-cen login-com-row">
          <div>
            <FaUserAlt fill="#001858" />
          </div>
          <input
            autoComplete="username"
            value={loginUser.account}
            type="text"
            id="inputName"
            placeholder="Tên người dùng"
            onChange={(e) =>
              setLoginUser({ ...loginUser, account: e.target.value })
            }
          />
        </div>
        <div className="flexr flex-cen login-com-row">
          <div>
            <FaLock fill="#001858" />
          </div>
          <input
            autoComplete="current-password"
            value={loginUser.pass}
            type="password"
            id="inputPass"
            placeholder="Mật khẩu"
            onChange={(e) =>
              setLoginUser({ ...loginUser, pass: e.target.value })
            }
          />
        </div>
        <div>
          <button className="btn login-com-btn" onClick={loginToUser}>
            Đăng nhập
          </button>
        </div>
        <p hidden={props.isSuccess} className="alert-color">
          Tên đăng nhập và mật khẩu không khớp
        </p>
        <div className="flexr flex-bet login-com-bot">
          <p>Quên mật khẩu</p>
          <p className="remove-link">
            <Link to={ROUTER.userRegister}>Tạo tài khoản</Link>
          </p>
        </div>
      </div>
    </form>
  );
};
export default LogInForm;
