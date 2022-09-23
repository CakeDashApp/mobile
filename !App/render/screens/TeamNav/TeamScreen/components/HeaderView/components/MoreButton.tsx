import React, { useCallback, useState } from "react";
import CBottomSelector from "../../../../../../components/default/cBottomSelector";
import CIcon from "../../../../../../../assets/icons/cIcon";
import { ItemInterface } from "../../../../../../components/default/cBottomSelector/controller";

interface Props {
  teamId: string;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
  onLeave?: (id: string) => void;
}

const MoreButton: React.FC<Props> = (props) => {
  // Props
  const { teamId, onEdit, onRemove, onLeave } = props;

  // Key
  const [EDIT_KEY] = useState<string>("edit");
  const [REMOVE_KEY] = useState<string>("remove");
  const [LEAVE_KEY] = useState<string>("leave");

  //======================================================================================================================
  // On Change
  //======================================================================================================================

  const onChange = useCallback(
    (options: { key: React.ReactText; label: string }) => {
      switch (options.key) {
        case EDIT_KEY:
          onEdit && onEdit(teamId);
          break;
        case REMOVE_KEY:
          onRemove && onRemove(teamId);
          break;
        case LEAVE_KEY:
          onLeave && onLeave(teamId);
          break;
      }
    },
    [teamId, onEdit, onRemove, onLeave]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    // @ts-ignore
    <CBottomSelector
      items={[
        onEdit && ({ key: EDIT_KEY, label: "Edit" } as ItemInterface),
        onRemove && ({ key: REMOVE_KEY, label: "Remove" } as ItemInterface),
        onLeave && ({ key: LEAVE_KEY, label: "Leave" } as ItemInterface),
      ].filter((item): item is ItemInterface => item !== undefined)}
      onChange={onChange}
      cancel
      absolute
    >
      <CIcon type={"more"} color={"white"} strokeWidth={2} />
    </CBottomSelector>
  );
};

export default MoreButton;
