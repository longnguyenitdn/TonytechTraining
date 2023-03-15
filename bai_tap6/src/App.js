import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { getUser } from "./api/user";
import { useDispatch } from "react-redux";
import { fetchData } from "./redux/actions";
import { ROUTER, getRouter } from "./config/routers";
import { useNavigate } from "react-router-dom";

function App() {
  const naviagte = useNavigate();
  const userId = window.localStorage.getItem("id");
  const userLink = getRouter(ROUTER.user, {
    userId: userId,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getUser()
      .then((data) => {
        dispatch(fetchData(data));
        const isExist = data.some((user) => user.id === parseInt(userId));

        if (isExist) {
          naviagte(userLink);
        } else {
          naviagte(ROUTER.userLogin);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <Outlet />;
}

export default App;
