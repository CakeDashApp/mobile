import React from "react";
import MemberImage from "./MemberImage";
import MoreImage from "./MoreImage";
import styled from "styled-components/native";
import { MemberInterface } from "../../../../../../../../../src/core/controllers/member/member.interface";

interface Props {
  members: MemberInterface[];
  onMember: (id: string) => void;
  onMoreMembers: () => void;
}

const MembersListView: React.FC<Props> = (props) => {
  // Props
  const { members, onMoreMembers, onMember } = props;

  const maxShownMembers = 5;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      {members.map((member, index) => {
        // Render Image
        if (index < maxShownMembers - 1 || members.length === maxShownMembers)
          return (
            <ImageContainer key={index}>
              <MemberImage
                imageId={member.memberData.imageId}
                onPress={() => onMember(member.id)}
                status={member.memberData.status}
              />
            </ImageContainer>
          );

        // Render More Image
        if (index === maxShownMembers)
          return (
            <ImageContainer key={index}>
              <MoreImage
                onPress={onMoreMembers}
                totalMemberCount={members.length}
                maxShownMembers={maxShownMembers}
              />
            </ImageContainer>
          );
      })}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex-direction: row;
`;

const ImageContainer = styled.View`
  margin: 0 2px;
`;

export default MembersListView;
