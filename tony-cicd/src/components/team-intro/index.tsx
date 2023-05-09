import React from "react";
import { BsChevronExpand } from "react-icons/bs";
import Link from "next/link";

const TeamIntro = () => {
  return (
    <div className="px-5 py-7">
      <div className="border bg-slate-50 rounded-md px-7">
        <div className="text-center p-7 border-b">
          <p className="text-[#475366] text-sm font-normal">
            You don't have any teams yet
          </p>
          <p className="text-[#62738d] text-xs font-normal py-3">
            Every team you create appear in select tag
          </p>
          <button className="border bg-[#79589f] text-white p-2 rounded-md h-10 text-sm font-normal px-5">
            <Link href={"new-team"}>Create new team</Link>
          </button>
        </div>
        <div className="py-7 flex flex-col items-center">
          <p className="text-[#475366] text-sm font-normal">
            Looking for help getting started?
          </p>
          <p className="text-[#62738d] text-xs font-normal py-3">
            Get started by reading one of our language guides in the Dev Center
          </p>
          <button className="border border-[#79589f] text-white p-1 rounded-md h-7  px-2 flex items-center">
            <span className="text-[#79589f] text-xs font-semibold">
              Choose a language guide...
            </span>
            <BsChevronExpand className="fill-[#79589f]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamIntro;
