import { useEffect, useState } from "react";
import { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../config/routers";

const UserController = (props) => {
  const wrapperRef = useRef(null);
  const [isOpenOption, setIsOpenOption] = useState(true);
  const navigate = useNavigate();

  const onMenuClick = (e) => {
    setIsOpenOption(false);
  };
  const logOut = () => {
    window.localStorage.clear();
    navigate(ROUTER.userLogin);
  };
  const transferToUserHome = () => {
    navigate(ROUTER.userHome);
    setIsOpenOption(true);
  };
  const handleClickOutside = (e) => {
    if (wrapperRef?.current.contains(e.target) === false) {
      setIsOpenOption(true);
    } else {
      return;
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="user-controller">
      <span>{props.user ? props.user.name : "..."}</span>
      <button onClick={onMenuClick}>
        <AiOutlineUser />
      </button>
      <ul hidden={isOpenOption}>
        <li onClick={transferToUserHome}>Trang cá nhân</li>
        <li onClick={logOut}>Đăng xuất</li>
      </ul>
    </div>
  );
};
export default UserController;
