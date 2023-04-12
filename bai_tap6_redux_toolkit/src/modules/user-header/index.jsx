import UserController from "../../components/user-controller";
import { useDispatch, useSelector } from "react-redux";

import { ROUTER } from "../../config/routers";
import { useNavigate } from "react-router-dom";
import { loginUserSelector } from "../../redux/selectors/loginUserSelector";
import { useEffect } from "react";
import { getUserLoginLocal } from "../../redux/actions/user.action";
import { logOutUser } from "../../redux/actions/authUser.action";

export default function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(loginUserSelector);
  const id = window.localStorage.getItem("id");

  const logOut = () => {
    dispatch(logOutUser());
    navigate(ROUTER.userLogin);
  };
  useEffect(() => {
    if (id) {
      dispatch(getUserLoginLocal(id));
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  return <UserController userName={userLogin?.name} logOut={logOut} />;
}
