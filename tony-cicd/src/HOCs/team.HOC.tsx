// import React, { useEffect } from "react";
// import { useState } from "react";
// import { ROUTER } from "../config/routers";
// import { getUserLoginLocal } from "../redux/actions/user.action";
// import { useRouter } from "next/router";
// import { useAppDispatch } from "@/redux/store";
// import Loading from "@/components/loading";

// export function withUser<T>(WrappedComponent: React.ComponentType<T>) {
//   const HigherComponent = (props: T) => {
//     const router = useRouter();

//     let id = localStorage.getItem("id");
//     if (typeof id === "string") {
//       id = JSON.parse(id);
//     }
//     const [isLoading, setIsLoading] = useState(false);
//     const dispatch = useAppDispatch();

//     const checkUserLogin = async (id: number) => {
//       setIsLoading(true);
//       const res = await dispatch(getUserLoginLocal(id));
//       console.log(res);
//       if (res.error) {
//         router.push(ROUTER.login);
//       }
//       setIsLoading(false);
//     };
//     useEffect(() => {
//       if (id) {
//         checkUserLogin(Number(id));
//       } else {
//         router.push(ROUTER.login);
//       }
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps
//     return isLoading ? <Loading /> : <WrappedComponent {...props} />;
//   };
//   return HigherComponent;
// }
