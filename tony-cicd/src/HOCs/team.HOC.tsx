import React, { useEffect } from "react";
import { useState } from "react";
import { ROUTER } from "../config/routers";
import { getUserLoginLocal } from "../redux/actions/user.action";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/store";
import Loading from "@/components/loading";
import { setLoginUser } from "@/redux/reducers/user.slice";
import { fetchTeamByUser } from "@/redux/actions/team.action";
import { fetchProjectByUser } from "@/redux/actions/project.action";

export function withUser(WrappedComponent: React.ComponentType) {
  const HigherComponent = (props: any) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    const checkUserLogin = async (id: number) => {
      setIsLoading(true);
      const payload = await dispatch(getUserLoginLocal(id)).unwrap();

      if (payload.error) {
        router.push(ROUTER.login);
      } else {
        dispatch(setLoginUser(payload.user));
        dispatch(fetchTeamByUser(id));
        dispatch(fetchProjectByUser(id));
      }
      setIsLoading(false);
    };

    useEffect(() => {
      const id = localStorage.getItem("id");
      if (id) {
        checkUserLogin(Number(id));
      } else {
        router.push(ROUTER.login);
      }
    }, []);
    return isLoading ? <Loading /> : <WrappedComponent {...props} />;
  };
  return HigherComponent;
}
