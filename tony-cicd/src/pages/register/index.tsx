import LoginRegisterFooter from "@/components/login-register-footer";
import LoginRegisterHeader from "@/components/login-register-header";
import RegisterForm from "@/components/register-form";
import LoginRegisterLayout from "@/components/layouts/login-register-layout";
import { registerUser } from "@/redux/actions/user.action";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { ROUTER } from "../../config/routers";

import { useAppDispatch } from "../../redux/store";
import { IUser } from "../../types/user.type";

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const handleAddUser = async (user: IUser) => {
    if (user.name === "" || user.email === "" || user.pass === "") {
      alert("Chú ý: Các trường input không được để trống");
      return;
    } else {
      const res = await dispatch(registerUser(user)).unwrap();
      if (res.error) {
        setFailNotification();
      } else {
        router.push(ROUTER.home);
      }
    }
  };

  return (
    <LoginRegisterLayout>
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
      <LoginRegisterHeader />
      <RegisterForm handleAddUser={handleAddUser} />
      <LoginRegisterFooter />
    </LoginRegisterLayout>
  );
};

export default Register;
