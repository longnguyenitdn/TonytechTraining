import LoginRegisterFooter from "@/components/login-register-footer";
import LoginRegisterHeader from "@/components/login-register-header";
import RegisterForm from "@/components/register-form";
import LoginRegisterLayout from "@/components/layouts/login-register-layout";
import { registerUser } from "@/redux/actions/user.action";
import React from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ROUTER } from "../../config/routers";

import { useAppDispatch } from "../../redux/store";
import { IUser } from "../../types/user.type";

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddUser = async (user: IUser) => {
    const res = await dispatch(registerUser(user)).unwrap();
    if (res.error) {
      toast.error("Register Fail, Opp!");
    } else {
      toast.success("Add New Success");
      router.push(ROUTER.home);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <LoginRegisterHeader />
      <RegisterForm handleAddUser={handleAddUser} />
      <LoginRegisterFooter />
    </div>
  );
};

Register.getLayout = function getLayout() {
  return LoginRegisterLayout;
};

export default Register;
