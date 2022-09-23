import React, {useCallback, useContext, useState} from "react";
import { View } from "react-native";
import CTabButton from "../../../../../../../components/project/cTabButton";
import styled from "styled-components/native";
import CText from "../../../../../../../components/default/cText";
import * as controller from "../../controller";
import strings from "./strings";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {}

const StatusView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Keys
  const [OPEN_KEY] = useState("open");
  const [CLOSED_KEY] = useState("closed");
  const [INVITE_KEY] = useState("invite");
  const currentKey = controller.TeamEditor.getValue("status") || "open";

  //======================================================================================================================
  // On Status Change
  //======================================================================================================================

  const onStatusChange = useCallback((key: string) => {
    controller.TeamEditor.setValue("status", key);
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <ButtonsContainer>
        <CTabButton
          label={"Open"}
          selected={currentKey === OPEN_KEY}
          onPress={() => onStatusChange(OPEN_KEY)}
          color={{ selectedColor: "#31D075" }}
          fontSize={15}
        />
        <CTabButton
          label={"Closed"}
          selected={currentKey === CLOSED_KEY}
          onPress={() => onStatusChange(CLOSED_KEY)}
          color={{ selectedColor: "#D03131" }}
          fontSize={15}
        />
        <CTabButton
          label={"Invite"}
          selected={currentKey === INVITE_KEY}
          onPress={() => onStatusChange(INVITE_KEY)}
          color={{ selectedColor: "#D045E7" }}
          fontSize={15}
        />
      </ButtonsContainer>
      <Description color={theme.colors.on_surface_3} size={10}>
        {strings().statusDescription}
      </Description>
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ButtonsContainer = styled.View`
  flex-direction: row;
`;

const Description = styled(CText)`
  margin-top: 10px;
`;

export default StatusView;
