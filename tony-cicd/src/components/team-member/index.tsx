import React, { useState } from "react";
import TeamInviteMemberModal from "./team-invite-member-modal";
import TeamMemberList from "../team-member-list";
type ITeamMemberProps = {
  teamId: number;
};
const TeamMember = (props: ITeamMemberProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  return (
    <>
      <div className="border-t border-b">
        <div className="flex justify-between px-7 py-3 items-center">
          <span className=" text-sm font-medium w-[25%] text-left text-[#79589f]">
            Team Members
          </span>
          <span className=" text-sm font-medium w-[25%] text-center text-[#79589f]">
            User
          </span>
          <span className=" text-sm font-medium w-[25%] text-center text-[#79589f]">
            Role
          </span>

          <div className="w-[25%] text-right">
            <button
              onClick={() => setIsOpenForm(true)}
              className="border border-[#79589f] rounded py-1 px-2 hover:bg-violet-100 text-sm font-normal text-[#79589f] "
            >
              Add Member
            </button>
          </div>
        </div>
        {isOpenForm === true && (
          <TeamInviteMemberModal
            setIsOpenForm={setIsOpenForm}
            teamId={props.teamId}
          />
        )}
      </div>
      <TeamMemberList />
    </>
  );
};

export default TeamMember;
