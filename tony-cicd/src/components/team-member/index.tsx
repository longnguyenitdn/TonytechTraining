import React from "react";
import TeamInviteMemberModal from "../team-invite-member-modal";

const TeamMember = () => {
  return (
    <div className="border-t">
      <div className="flex justify-between px-3 py-5">
        <span className="text-slate-500 text-sm font-medium">Team Members</span>
        <button className="border border-[#79589f] rounded py-1 px-2 hover:bg-violet-100 text-sm font-normal text-[#79589f] ">
          Add Member
        </button>
      </div>
      <TeamInviteMemberModal />
    </div>
  );
};

export default TeamMember;
