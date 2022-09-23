import React, {useCallback, useContext, useState} from "react";
import CIcon from "../../../../../assets/icons/cIcon";
import CBottomSelector from "../../../../components/default/cBottomSelector";
import { MemberInterface } from "../../../../../src/core/controllers/member/member.interface";
import { ItemInterface } from "../../../../components/default/cBottomSelector/controller";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  member: MemberInterface;
  onKick?: (id: string) => void;
  onAdmin?: (id: string, admin: boolean) => void;
  onCreator?: (id: string) => void;
}

const MoreButton: React.FC<Props> = (props) => {
  // Props
  const { member, onKick, onAdmin, onCreator } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Key
  const [KICK_KEY] = useState<string>("kick");
  const [ADMIN_KEY] = useState<string>("admin");
  const [CREATOR_KEY] = useState<string>("creator");

  //======================================================================================================================
  // On Change
  //======================================================================================================================

  const onChange = useCallback(
    (options: { key: React.ReactText; label: string }) => {
      switch (options.key) {
        case KICK_KEY:
          onKick && onKick(member.id);
          break;

        case ADMIN_KEY:
          onAdmin && onAdmin(member.id, member.memberData.role !== "admin");
          break;

        case CREATOR_KEY:
          onCreator && onCreator(member.id);
          break;
      }
    },
    [member, onKick]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    // @ts-ignore
    <CBottomSelector
      items={[
        onKick && ({ key: KICK_KEY, label: "Kick" } as ItemInterface),
        onAdmin &&
          ({
            key: ADMIN_KEY,
            label:
              member.memberData.role === "admin"
                ? "Remove from Admins"
                : "Add to Admins",
          } as ItemInterface),
        onCreator &&
          ({ key: CREATOR_KEY, label: "Make to Owner" } as ItemInterface),
      ].filter((item): item is ItemInterface => item !== undefined)}
      onChange={onChange}
      cancel
    >
      <CIcon type={"more"} color={theme.colors.on_primary} strokeWidth={2} />
    </CBottomSelector>
  );
};

export default MoreButton;
