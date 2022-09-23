import React, {useCallback, useContext, useState} from "react";
import CBottomSelector from "../../../default/cBottomSelector";
import CIcon from "../../../../../assets/icons/cIcon";
import { ItemInterface } from "../../../default/cBottomSelector/controller";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  teamId: string;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
  onLeave?: (id: string) => void;
}

const MoreButton: React.FC<Props> = (props) => {
  // Props
  const { teamId, onEdit, onRemove, onLeave } = props;

  // Theme
  const theme = useContext(ThemeContext);

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
    <CBottomSelector
      items={[
        onEdit && ({ key: EDIT_KEY, label: "Edit" } as ItemInterface),
        onRemove && ({ key: REMOVE_KEY, label: "Remove" } as ItemInterface),
        onLeave && ({ key: LEAVE_KEY, label: "Leave" } as ItemInterface),
      ].filter((item): item is ItemInterface => item !== undefined)}
      onChange={onChange}
      cancel
    >
      <CIcon type={"more"} color={theme.colors.on_background} strokeWidth={2} />
    </CBottomSelector>
  );
};

export default MoreButton;
