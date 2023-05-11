import { IUser } from "@/types/user.type";
import React from "react";
type IMemberProps = {
  user?: string;
  index: number;
  role: string;
};
const Member = (props: IMemberProps) => {
  return (
    <div className="flex justify-between items-center py-1 px-3 my-1 border-b">
      <span className="text-left px-5 w-[25%]">{props.index + 1}</span>
      <span className="text-center px-5 w-[25%]">{props.user}</span>
      <span className="text-center px-5 w-[25%]">{props.role}</span>
      <span className="text-right px-5 w-[25%]"></span>
    </div>
  );
};

export default Member;
