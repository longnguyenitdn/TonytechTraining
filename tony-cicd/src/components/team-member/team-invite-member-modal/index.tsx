import React, { useEffect, useState } from "react";
import InviteTeamMemberForm from "./team-invite-member-form";
import { getUserByEmail } from "@/api/user";
import { getUserTeam } from "@/api/user-team";
import { IUserTeam } from "@/types/user-team.type";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import {
  addNewUserTeam,
  fetchUserTeamByTeamId,
} from "@/redux/actions/userTeam.action";
import { useRouter } from "next/router";
type ITeamInviteMemberModalProps = {
  setIsOpenForm: (isOpen: boolean) => void;
  teamId: number;
};

const TeamInviteMemberModal = (props: ITeamInviteMemberModalProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const teamId = router.query.teamId;
  const [isExistEmail, setIsExistEmail] = useState(true);
  const checkIsExistMember = async (userId: number, teamId: number) => {
    const [userTeam] = await getUserTeam(userId, teamId);
    if (userTeam?.teamId) {
      setIsExistEmail(false);
      return false;
    } else {
      setIsExistEmail(true);
      return true;
    }
  };
  const validEmail = async (email: string) => {
    let res: {
      userId?: number;
      flag?: boolean;
    } = {};
    const [user] = await getUserByEmail(email);
    if (!user?.id) {
      setIsExistEmail(false);
      res.flag = false;
    } else {
      setIsExistEmail(true);
      const flag = await checkIsExistMember(user.id, props.teamId);
      if (flag) {
        res = {
          flag: true,
          userId: user.id,
        };
      } else {
        res.flag = false;
      }
    }
    return res;
  };

  const handleAddMember = async (userTeam: IUserTeam) => {
    const repponse = await dispatch(addNewUserTeam(userTeam)).unwrap();
    if (repponse.error) {
      toast.error("Add New Fail, Opp!");
    } else {
      props.setIsOpenForm(false);
      toast.success("Add New Success");
    }
  };
  useEffect(() => {
    return () => {
      dispatch(fetchUserTeamByTeamId(Number(teamId)));
    };
  }, []);
  return (
    <>
      <div className="fixed w-full h-full top-[0] left-[0] bg-gray-900 opacity-70 z-[51]"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  z-[52]">
        <InviteTeamMemberForm
          setIsOpenForm={props.setIsOpenForm}
          isExistEmail={isExistEmail}
          validEmail={validEmail}
          teamId={props.teamId}
          handleAddMember={handleAddMember}
        />
      </div>
    </>
  );
};

export default TeamInviteMemberModal;
