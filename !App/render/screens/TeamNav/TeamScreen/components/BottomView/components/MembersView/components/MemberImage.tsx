import React, {useContext} from "react";
import CImage from "../../../../../../../../components/default/cImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Label from "./Label";
import { StatusType } from "../../../../../../../../../src/core/controllers/user/user.interface";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
  imageId: string | null;
  status: StatusType;
}

const MemberImage: React.FC<Props> = (props) => {
  // Props
  const { onPress, imageId, status } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={onPress}>
      <CImage id={imageId} round width={50} height={50} />
      <Label type={status} backgroundColor={theme.colors.background} />
    </TouchableOpacity>
  );
};

export default MemberImage;
