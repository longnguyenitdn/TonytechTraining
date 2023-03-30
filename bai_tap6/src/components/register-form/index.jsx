import React from "react";
import { useState } from "react";

import { FaUserAlt, FaLock, FaKey } from "react-icons/fa";

const RegisterForm = (props) => {
  const [readRule, setReadRule] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isSamePass, setIsSamePass] = useState(true);
  const [confirmPass, setConfirmPass] = useState("");
  const [user, setUser] = useState({
    name: "",
    account: "",
    pass: "",
  });

  const toggleAgree = () => {
    setAgree(!agree);
  };

  const onSubmitHandleAddUser = () => {
    if (user.pass === confirmPass) {
      setIsSamePass(true);
      props.handleAddUser(user);
    } else {
      setIsSamePass(false);
      return;
    }
  };

  return (
    <div className="sign-in-com">
      <h3>Đăng ký tài khoản tại TonyBook</h3>
      <p>
        Chào mừng bạn đến Nền tảng TonyBook! Tham gia cùng chúng tôi để chia sẻ
        những khoảnh khắc đáng nhớ của bạn. Vui lòng điền thông tin của bạn vào
        biểu mẫu bên dưới để tiếp tục.
      </p>
      <div className="flexc flex-cen sign-in-com-content">
        <div className="sign-in-com-row flexr flex-cen">
          <div>
            <FaUserAlt fill="#001858" />
          </div>
          <input
            value={user.name}
            type="text"
            placeholder="Tên của bạn"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="sign-in-com-row flexr flex-cen">
          <div>
            <FaKey fill="#001858" />
          </div>
          <input
            value={user.account}
            type="text"
            placeholder="Tên tài khoản"
            onChange={(e) => setUser({ ...user, account: e.target.value })}
          />
        </div>
        <div className="sign-in-com-row flexr flex-cen">
          <div>
            <FaLock fill="#001858" />
          </div>
          <input
            value={user.pass}
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          />
        </div>
        <div className="sign-in-com-row flexr flex-cen">
          <div>
            <FaLock fill="#001858" />
          </div>
          <input
            value={confirmPass}
            type="password"
            placeholder="Xác nhận mật khẩu"
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        {isSamePass === false && (
          <p className="sign-in-confirm-text">
            Xác nhận mật khẩu không chính xác
          </p>
        )}
        <div className="sign-in-com-rule flexr  flex-cen">
          <input type="checkbox" id="rule" onChange={toggleAgree} />
          <label htmlFor="rule">Tôi đồng ý với</label>
          <button
            className="sign-in-com-rule-btn"
            onClick={() => setReadRule(true)}
          >
            Điều khoản của TonyBook
          </button>
        </div>
        <div className="sign-in-com-rule-btn-modal">
          <div hidden={agree ? true : false}></div>
          <button className="btn" onClick={onSubmitHandleAddUser}>
            Đăng ký
          </button>
        </div>
      </div>
      <div hidden={readRule ? false : true} className="sign-in-modal">
        <div className="sign-in-modal-cover">
          <div className="sign-in-modal-content">
            <div>
              <h3>Điều khoản đăng ký TonyBook</h3>
              <ol>
                <li>Làm việc nghiêm túc</li>
                <li>Ăn nhậu hêt mình</li>
                <li>Hết cmnr ^^!</li>
              </ol>
              <button className="btn " onClick={() => setReadRule(false)}>
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
