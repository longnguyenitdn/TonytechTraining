import { IUserTeam } from "@/types/user-team.type";
import React, { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
type IInviteTeamMemberForm = {
  setIsOpenForm: (isOpen: boolean) => void;
  isExistEmail: boolean;
  validEmail: (email: string) => Promise<{ userId?: number; flag?: boolean }>;
  teamId?: number;
  handleAddMember: (userTeam: IUserTeam) => void;
};
const InviteTeamMemberForm = (props: IInviteTeamMemberForm) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("dev");
  const onsubmitUserTeam = async (email: string, role: string) => {
    const res = await props.validEmail(email);
    if (!res.flag) {
      return;
    } else {
      props.handleAddMember({
        userId: res.userId,
        teamId: props.teamId,
        role: role,
      });
    }
  };
  return (
    <div className="bg-white rounded-md w-[400px] overflow-hidden">
      <div className="bg-[#79589f] text-center p-3 text-white font-normal">
        Add member
      </div>
      <div className="p-3">
        <p className="text-sm py-2 font-normal">Email address</p>
        <div className="flex border rounded-md overflow-hidden">
          <button className="bg-slate-300">
            <FaUserSecret className="m-2 text-xl text-white" />
          </button>
          <input
            type="text"
            className="w-full px-3 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm py-2 font-normal">Role in Team</p>
        <div>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
            className="w-full  outline outline-1 outline-violet-500 rounded px-3 mb-5"
          >
            <option defaultValue="dev">Dev</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {!props.isExistEmail && (
          <p className="text-red-500 font-normal text-center py-1">
            Invalid email!
          </p>
        )}
      </div>
      <div className="border-t p-3 flex justify-around items-center">
        <button
          onClick={() => props.setIsOpenForm(false)}
          className="bg-white border border-[#79589f] text-[#79589f] rounded py-1 w-[150px] text-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => onsubmitUserTeam(email, role)}
          className="bg-[#79589f] text-white rounded py-1 w-[150px] text-sm"
        >
          Add member
        </button>
      </div>
    </div>
  );
};

export default InviteTeamMemberForm;
