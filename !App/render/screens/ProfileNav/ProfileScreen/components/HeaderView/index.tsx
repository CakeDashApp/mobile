import React, { useContext } from "react";
import ProfileButton from "./components/ProfileButton";
import core from "../../../../../../src/core";
import styled from "styled-components/native";
import ProfileImagePicker from "./components/ProfileImagePicker";
import CText from "../../../../../components/default/cText";
import * as controller from "../../controller";
import strings from "./strings";
import ResetImageButton from "./components/ResetImageButton";
import DescriptionView from "./components/DescriptionView";
import { ImageInterface } from "../../../../../../src/core/controllers/image/image.interface";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  onImageChange: (image: ImageInterface) => void;
  onResetImage: () => void;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onShowFullDescription: () => void;
}

const HeaderView: React.FC<Props> = (props) => {
  // Props
  const {
    onImageChange,
    onResetImage,
    onEditProfile,
    onChangePassword,
    onShowFullDescription,
  } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Mail
  const email = useAgile(core.auth.EMAIL);
  const user = useAgile(core.user.CURRENT_USER);
  const imageItem = controller.ProfileEditor.getItemById("image");

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <ProfileContainer>
        <ProfileImagePicker
          onImageChange={onImageChange}
          defaultImage={imageItem?.initialStateValue}
          image={imageItem?.value}
        />
        <ProfileTextContainer>
          <CText color={theme.colors.on_primary} size={25}>
            {user?.userData.name}
          </CText>
          <CText color={theme.colors.on_primary}>{email}</CText>
          <ResetImageButton onPress={onResetImage} />
        </ProfileTextContainer>
      </ProfileContainer>
      <DescriptionView onPress={onShowFullDescription} />
      <ButtonContainer>
        <ProfileButton
          color={theme.colors.secondary}
          label={strings().editProfileButtonText}
          onPress={onEditProfile}
        />
        <ProfileButton
          color={theme.colors.on_primary_3}
          label={strings().changePasswordButtonText}
          onPress={onChangePassword}
        />
      </ButtonContainer>
    </Container>
  );
};

//======================================================================================================================
// Render
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileTextContainer = styled.View`
  margin-left: 15px;
`;

export default HeaderView;
