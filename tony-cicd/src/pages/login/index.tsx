import LoginForm from "@/components/login-form";
import LoginRegisterFooter from "@/components/login-register-footer";
import LoginRegisterHeader from "@/components/login-register-header";
import LoginRegisterLayout from "@/components/layouts/login-register-layout";
import React from "react";

const Login = () => {
  return (
    <LoginRegisterLayout>
      <LoginRegisterHeader />
      <LoginForm />
      <LoginRegisterFooter />
    </LoginRegisterLayout>
  );
};

export default Login;
