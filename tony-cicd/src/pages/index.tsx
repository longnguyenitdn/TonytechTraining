import React, { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { BsChevronExpand } from "react-icons/bs";
import NewTeamModal from "@/components/new-team-modal";
import TeamHeader from "@/components/layouts/team-header";

const index = () => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  return (
    <>
      <TeamHeader />
      <div>
        <div className="flex justify-between border-b py-1 bg-slate-50 ">
          <div
            onClick={() => setIsAdd(true)}
            className="flex items-center  hover:bg-gray-200 rounded-lg relative h-10 m-3"
          >
            <div className="cursor-pointer flex items-center px-2">
              <FaUserCircle className="text-[#79589f] text-2xl" />
              <span className="text-[#79589f] p-1 text-sm font-normal">
                Personal
              </span>
              <BsChevronExpand className="fill-[#79589f]" />
            </div>
            {isAdd === true && <NewTeamModal setIsAdd={setIsAdd} />}
          </div>
          <div className="flex border border-[#79589f] items-center rounded h-8 p-1 m-5 px-2 hover:bg-gray-200 cursor-pointer">
            <span className="text-[#79589f] px-1 text-sm font-normal">New</span>
            <BsChevronExpand className="fill-[#79589f]" />
          </div>
        </div>
        <div className="px-5 py-7">
          <div className="border bg-slate-50 rounded-md px-7">
            <div className="text-center p-7 border-b">
              <p className="text-[#475366] text-sm font-normal">
                You don't have any apps yet
              </p>
              <p className="text-[#62738d] text-xs font-normal py-3">
                Every app and pipeline you create or become a collaborator on
                will appear here
              </p>
              <button className="border bg-[#79589f] text-white p-2 rounded-md h-10 text-sm font-normal px-5">
                Create new app
              </button>
            </div>
            <div className="py-7 flex flex-col items-center">
              <p className="text-[#475366] text-sm font-normal">
                Looking for help getting started?
              </p>
              <p className="text-[#62738d] text-xs font-normal py-3">
                Get started by reading one of our language guides in the Dev
                Center
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
      </div>
    </>
  );
};

export default index;
