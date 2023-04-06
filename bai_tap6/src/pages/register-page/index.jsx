import React from "react";
import RegisterForm from "../../components/register-form";
import { ROUTER } from "../../config/routers";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../redux/actions/authUser.action";
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setFailNotification = () =>
    toast.error("Register Fail, Opp!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleAddUser = (user) => {
    if (user.name === "" || user.account === "" || user.pass === "") {
      alert("Chú ý: Các trường input không được để trống");
      return;
    } else {
      const res = dispatch(registerUser(user));
      if (res.error) {
        setFailNotification();
      } else {
        navigate(ROUTER.home);
      }
    }
  };
  return (
    <div className="flexc base-layout-cover">
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

      <RegisterForm handleAddUser={handleAddUser} />
    </div>
  );
};
export default RegisterPage;
