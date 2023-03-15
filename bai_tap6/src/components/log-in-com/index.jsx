import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { usersSelector } from "../../redux/selectors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogInCom = () => {
  const navigate = useNavigate();
  const users = useSelector(usersSelector);
  const [isSuccess, setIsSuccess] = useState(true);

  const [loginUser, setLoginUser] = useState({
    account: "",
    pass: "",
  });

  const checkLoginUser = () => {
    const user = users.find((user) => user.account === loginUser.account);
    return new Promise((resolve, reject) => {
      if (user?.pass === loginUser.pass) {
        resolve(user.id);
      } else {
        reject(new Error("Sai thông tin đăng nhập"));
      }
    });
  };
  const setLoginId = (id) => {
    window.localStorage.clear();
    window.localStorage.setItem("id", id);
  };

  const loginToUser = () => {
    checkLoginUser()
      .then((data) => {
        if (data) {
          setLoginId(data);
          navigate(`/users/${data}`);
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
      });
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
        <p hidden={isSuccess} className="alert-color">
          Tên đăng nhập và mật khẩu không khớp
        </p>
        <div className="flexr flex-bet login-com-bot">
          <p>Quên mật khẩu</p>
          <p className="remove-link">
            <Link to={"/sign-in"}>Tạo tài khoản</Link>
          </p>
        </div>
      </div>
    </form>
  );
};
export default LogInCom;
