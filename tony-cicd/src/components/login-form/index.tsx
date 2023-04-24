import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Link from "next/link";
const LoginForm = () => {
  return (
    <>
      <div className="bg-white rounded-lg w-96 overflow-hidden">
        <div className="flex flex-col justify-center items-center p-8 ">
          <p className="mb-6 text-purple-800 text-2xl">Login to your account</p>
          <div className="flex flex-col my-6">
            <p className="text-xs">Email address</p>
            <div className="flex border-solid border-2 border-slate-300 rounded-md items-center p-1">
              <div className="p-2 border-e text-violet-900">
                <FaUserAlt />
              </div>
              <input
                className="p-1 ml-1 text-sm w-64"
                type="text"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <p className="text-xs">Password</p>
            <div className="flex border-solid border-2 border-slate-300 rounded-md items-center p-1">
              <div className="p-2 border-e text-violet-900">
                <FaLock />
              </div>
              <input
                className="p-1 ml-1 text-sm w-64"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button className="bg-gradient-to-r from-fuchsia-800 to-purple-800 w-[95%] py-2 rounded-md my-6 text-white text-lg">
            Log in
          </button>
        </div>
        <div className="bg-gray-200 w-full text-center py-4">
          <p>
            New to CICD?{" "}
            <span className="text-violet-800">
              {" "}
              <Link href={"register"}>Register</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="mt-24">
        <p className="flex items-center justify-center text-2xl text-white">
          Tony is a <img className="w-3/12 mx-2" src="/IT.png" alt="" /> company
        </p>
      </div>
    </>
  );
};

export default LoginForm;
