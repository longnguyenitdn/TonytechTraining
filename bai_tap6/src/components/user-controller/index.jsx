import { useEffect, useState } from "react";
import { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../config/routers";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../redux/actions/loginUser.action";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const UserController = (props) => {
  const wrapperRef = useRef(null);
  const [isOpenOption, setIsOpenOption] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMenuClick = (e) => {
    setIsOpenOption(false);
  };
  const setFailNotification = () =>
    toast.error("LogOut Fail, Opp!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const logOut = async () => {
    const res = await dispatch(LogOutUser());
    if (res.error) {
      setFailNotification();
    } else {
      navigate(ROUTER.userLogin);
    }
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
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <li onClick={logOut}>Đăng xuất</li>
      </ul>
    </div>
  );
};
export default UserController;
