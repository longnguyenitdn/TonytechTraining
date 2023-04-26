import LoginForm from "@/components/login-form";
import LoginRegisterFooter from "@/components/login-register-footer";
import LoginRegisterHeader from "@/components/login-register-header";
import LoginRegisterLayout from "@/components/layouts/login-register-layout";
import React, { ReactElement, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { handleLoginUser } from "@/redux/actions/user.action";
import { ROUTER } from "@/config/routers";
import { useRouter } from "next/router";
import { setLoginUser } from "@/redux/reducers/user.slice";
const Login = () => {
  const [isSucess, setIsSuccess] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onSubmitGetUser = async (
    email: string,
    pass: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const res = await dispatch(
      handleLoginUser({
        email,
        pass,
      })
    ).unwrap();

    if (res.error) {
      setIsSuccess(false);
    } else {
      setLoginUser(res.user);
      router.push(ROUTER.home);
    }
  };

  return (
    <div>
      <LoginRegisterHeader />
      <LoginForm isSucess={isSucess} onSubmitGetUser={onSubmitGetUser} />
      <LoginRegisterFooter />
    </div>
  );
};

Login.getLayout = function getLayout() {
  return LoginRegisterLayout;
};

export default Login;
