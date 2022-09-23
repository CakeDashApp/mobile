import React from "react";
import styled from "styled-components/native";
import core from "../../../../../../src/core";
import StatsView from "./components/StatsView";
import AccountManagementView from "./components/AccountManagementView";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";

interface Props {
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const BottomView: React.FC<Props> = (props) => {
  // Props
  const { onLogout, onDeleteAccount } = props;

  // User
  const user = useAgile(core.user.CURRENT_USER);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  if (user) {
    return (
      <Container>
        <StatsView
          bakeSkill={user.userData.stats.bakeSkill}
          totalDashes={user.userData.stats.totalDashes}
          totalCakes={user.userData.stats.totalCakes}
        />
        <AccountManagementView
          onLogout={onLogout}
          onDeleteAccount={onDeleteAccount}
        />
      </Container>
    );
  }

  return null;
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  flex: 3;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px 10px 150px 10px;
`;

export default BottomView;
