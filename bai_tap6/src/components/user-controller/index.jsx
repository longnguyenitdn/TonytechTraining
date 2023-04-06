import { useEffect, useState } from "react";
import { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../config/routers";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UserController = (props) => {
  const wrapperRef = useRef(null);
  const [isOpenOption, setIsOpenOption] = useState(true);
  const navigate = useNavigate();

  const onMenuClick = (e) => {
    setIsOpenOption(false);
  };

  const onSubmitTolLogOut = () => {
    props.logOut();
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
      <span className="remove-link">
        <Link to={props.userName ? "" : ROUTER.userLogin}>
          {props.userName ? props.userName : "Đăng nhập"}
        </Link>
      </span>
      <button onClick={onMenuClick}>
        <AiOutlineUser />
      </button>
      <ul hidden={isOpenOption}>
        <li onClick={transferToUserHome}>Trang cá nhân</li>
        <li onClick={onSubmitTolLogOut}>Đăng xuất</li>
      </ul>
    </div>
  );
};
export default UserController;
