import React from "react";
import { getUser } from "../../api/user";
import LogInForm from "../../components/log-in-form";

const LogInPage = () => {
  const onSubmitGetUser = async () => {
    const users = await getUser();
    return users;
  };
  return (
    <div className="flexc base-layout-cover">
      <LogInForm onSubmitGetUser={onSubmitGetUser} />
    </div>
  );
};
export default LogInPage;
