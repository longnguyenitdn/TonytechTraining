import React from "react";
import RegisterForm from "../../components/register-form";
import { ROUTER } from "../../config/routers";
import { addUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleAddUser = (user) => {
    if (user.name === "" || user.account === "" || user.pass === "") {
      alert("Chú ý: Các trường input không được để trống");
      return;
    } else {
      addUser(user)
        .then(() => {
          navigate(ROUTER.userLogin);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="flexc base-layout-cover">
      <RegisterForm handleAddUser={handleAddUser} />
    </div>
  );
};
export default RegisterPage;
