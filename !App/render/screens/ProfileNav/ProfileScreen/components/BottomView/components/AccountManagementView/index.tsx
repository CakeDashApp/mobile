import React from "react";
import styled from "styled-components/native";
import LogoutButton from "./components/LogoutButton";
import DeleteAccountButton from "./components/DeleteAccountButton";
import { ThemeInterface } from "../../../../../../../../src/core/controllers/ui/interfaces";

interface Props {
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const AccountManagementView: React.FC<Props> = (props) => {
  // Props
  const { onLogout, onDeleteAccount } = props;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <Separator />
      <LogoutButton onPress={onLogout} />
      <DeleteAccountButton onPress={onDeleteAccount} />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-bottom: 10px;
`;

const Separator = styled.View<{ theme: ThemeInterface }>`
  margin: 10px 0;
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.on_background_2};
  opacity: 0.5;
`;

export default AccountManagementView;
