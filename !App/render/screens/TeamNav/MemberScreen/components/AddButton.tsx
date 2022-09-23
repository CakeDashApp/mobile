import React, {useCallback, useContext, useState} from "react";
import styled from "styled-components/native";
import CIcon from "../../../../../assets/icons/cIcon";
import CBottomSelector from "../../../../components/default/cBottomSelector";
import LinearGradient from "react-native-linear-gradient";
import { MemberInterface } from "../../../../../src/core/controllers/member/member.interface";
import { ItemInterface } from "../../../../components/default/cBottomSelector/controller";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  member: MemberInterface;
  onAddDash?: (memberId: string) => void;
}

const AddButton: React.FC<Props> = (props) => {
  // Props
  const { onAddDash, member } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Key
  const [ADD_DASH] = useState<string>("dash");

  //======================================================================================================================
  // On Change
  //======================================================================================================================

  const onChange = useCallback(
    (options: { key: React.ReactText; label: string }) => {
      switch (options.key) {
        case ADD_DASH:
          onAddDash && onAddDash(member.id);
          break;
      }
    },
    [member, onAddDash]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================
  // TODO sometimes this button has aids.. but it has nothing todo with the shadow.. (tested)
  console.log("Rerender AddButton");
  return (
    <Container style={theme.shadow}>
      <CBottomSelector
        items={[
          onAddDash && ({ key: ADD_DASH, label: "Add Dash" } as ItemInterface),
        ].filter((item): item is ItemInterface => item !== undefined)}
        onChange={onChange}
        cancel
        absolute
      >
        <Button colors={[theme.colors.secondary, theme.colors.secondary_2]}>
          <CIcon type={"plus"} color={theme.colors.on_secondary} size={30} />
        </Button>
      </CBottomSelector>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
`;

const Button = styled(LinearGradient)`
  border-radius: 100px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export default AddButton;
