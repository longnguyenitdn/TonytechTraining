import React, { useEffect } from "react";
import { ClickAwayListener } from "react-advanced-click-away";
import { useAppSelector } from "@/redux/store";
import { BsHexagonFill } from "react-icons/bs";
import { teamsSelector } from "@/redux/selector/team.selector";
import Link from "next/link";
import { ROUTER } from "@/config/routers";

type INewProjectModalProps = {
  setIsAddProject: (isAdd: boolean) => void;
};
const NewProjectModal = (props: INewProjectModalProps) => {
  const teams = useAppSelector(teamsSelector);
  useEffect(() => {}, []);
  return (
    <ClickAwayListener onClickAway={() => props.setIsAddProject(false)}>
      <div className="flex items-center text-[#79589f] border border-gray-300  top-[33px] left-[0] absolute w-[170px] rounded text-sm p-1 shadow-[0_3px_20px_0px_rgba(89,105,129,.3)] bg-white">
        <BsHexagonFill className="my-1 mx-2 text-base" />
        <p className="text-sm">
          <Link href={ROUTER.newProject}>Create new Project</Link>
        </p>
      </div>
    </ClickAwayListener>
  );
};

export default NewProjectModal;
