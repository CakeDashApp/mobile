import React, {useContext} from "react";
import DatevStaffBadge from "./components/badges/DatevStaffBadge";
import CakeDashStaffBadge from "./components/badges/CakeDashStaffBadge";
import CText from "../../../../../../../components/default/cText";
import RoleLabel from "./components/RoleLabel";
import Stars from "./components/Stars";
import { Dimensions, View } from "react-native";
import CImage from "../../../../../../../components/default/cImage";
import StatusLabel from "./components/StatusLabel";
import styled from "styled-components/native";
import strings from "./strings";
import DummyUserBadge from "./components/badges/DummyUserBadge";
import { MemberInterface } from "../../../../../../../../src/core/controllers/member/member.interface";
import { UserInterface } from "../../../../../../../../src/core/controllers/user/user.interface";
import { ThemeInterface } from "../../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {
  user: UserInterface;
  member: MemberInterface;
}

const MemberView: React.FC<Props> = (props) => {
  // Props
  const { member, user } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Badges
  const badgesKeyMap: any = {
    datev: <DatevStaffBadge />,
    cakedash: <CakeDashStaffBadge />,
    dummyUser: <DummyUserBadge />,
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <LeftContainer>
        <Item>
          <CText color={theme.colors.on_surface_2}>{strings().roleTitle}</CText>
          <RoleLabel type={member.memberData.role} />
        </Item>
        <Item>
          <CText color={theme.colors.on_surface_2}>
            {strings().bakeSkillTitle}
          </CText>
          <Stars stars={member.memberData.stats.starAverage} />
        </Item>
        <Item>
          <CText color={theme.colors.on_surface_2}>
            {strings().totalDashesTitle}
          </CText>
          <CText size={20} bold color={theme.colors.on_surface}>
            {member.memberData.stats.totalDashes}
          </CText>
        </Item>
      </LeftContainer>
      <RightContainer>
        <View>
          <CImage id={member.memberData.imageId} round />
          <StatusLabel
            type={member.memberData.status}
            backgroundColor={theme.colors.surface}
          />
        </View>
        <BadgesContainer>
          {user &&
            user.userData.badges.map((badge) => (
              <BadgeContainer key={badge}>
                {badgesKeyMap[badge] || null}
              </BadgeContainer>
            ))}
        </BadgesContainer>
      </RightContainer>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 20px;
  padding: 20px 20px 10px 20px;
  margin: 10px 10px 0 10px;
  flex-direction: row;
  justify-content: space-between;
  width: ${Dimensions.get("window").width - 20}px;
`;

const RightContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const LeftContainer = styled.View`
  flex: 1;
`;

const BadgesContainer = styled.View`
  margin-top: 5px;
  flex-direction: row;
`;

const BadgeContainer = styled.View`
  margin: 5px 3px 0 3px;
  align-items: flex-start;
`;

const Item = styled.View`
  margin: 7px 0;
`;

export default MemberView;
