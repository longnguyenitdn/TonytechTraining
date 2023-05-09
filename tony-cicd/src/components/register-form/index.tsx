import React, { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import {
  MdOutlineDriveFileRenameOutline,
  MdConfirmationNumber,
} from "react-icons/md";
import Link from "next/link";

import { IUser } from "@/types/user.type";

type IRegisterFormProps = {
  handleAddUser: (user: IUser) => void;
};

const RegisterForm = (props: IRegisterFormProps) => {
  const [isSame, setIsSame] = useState<boolean>(true);
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    pass: "",
  });

  const onSubmitHandleAddNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.pass === "") {
      alert("Chú ý: Các trường input không được để trống");
      return;
    } else {
      if (confirmPass !== user.pass) {
        setIsSame(false);
        return;
      } else {
        setIsSame(true);
        props.handleAddUser(user);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form action="#" onSubmit={(e) => onSubmitHandleAddNewUser(e)}>
        <div className="bg-white rounded-lg w-96 overflow-hidden">
          <div className="flex flex-col justify-center items-center p-8 ">
            <p className="mb-6 text-purple-800 text-2xl">
              Get started on CICD today
            </p>
            <div className="flex flex-col my-3">
              <p className="text-xs">Your name</p>
              <div className="flex border-solid border-2 border-slate-300 rounded-md items-center p-1">
                <div className="p-1 border-e text-violet-900">
                  <MdOutlineDriveFileRenameOutline className="text-2xl" />
                </div>
                <input
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="p-1 ml-1 text-sm w-64 outline-none"
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="flex flex-col my-3">
              <p className="text-xs">Email address</p>
              <div className="flex border-solid border-2 border-slate-300 rounded-md items-center p-1">
                <div className="p-2 border-e text-violet-900">
                  <FaUserAlt />
                </div>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="p-1 ml-1 text-sm w-64 outline-none"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex flex-col my-3">
              <p className="text-xs">Password</p>
              <div className="flex border-solid border-2 border-slate-300 rounded-md items-center p-1">
                <div className="p-2 border-e text-violet-900">
                  <FaLock />
                </div>
                <input
                  onChange={(e) => setUser({ ...user, pass: e.target.value })}
                  className="p-1 ml-1 text-sm w-64 outline-none"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex flex-col my-3">
              <p className="text-xs">Confirm password</p>
              <div className="flex border-solid border-2 border-slate-300 rounded-md items-center p-1">
                <div className="p-1 border-e text-violet-900">
                  <MdConfirmationNumber className="text-xl" />
                </div>
                <input
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="p-1 ml-1 text-sm w-64 outline-none"
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <p hidden={isSame} className="text-red-600 text-sm text-center">
              Your password doesn't match.Please try again
            </p>
            <button
              type="submit"
              className="bg-gradient-to-r from-fuchsia-800 to-purple-800 w-[95%] py-2 rounded-md mt-6 text-white text-lg"
            >
              Register
            </button>
          </div>
          <div className="bg-gray-200 w-full text-center py-4">
            <p>
              Already have an account?{" "}
              <span className="text-violet-800">
                <Link href={"login"}>Log in</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
      <div className="mt-16">
        <p className="flex items-center justify-center text-2xl text-white">
          Tony is a <img className="w-3/12 mx-2" src="/IT.png" alt="" /> company
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
