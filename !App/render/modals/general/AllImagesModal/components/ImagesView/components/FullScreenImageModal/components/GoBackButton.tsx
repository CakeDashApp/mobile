import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import CText from "../../../../../../../../components/default/cText";
import strings from "../strings";

interface Props {
    onPress: () => void;
}

const GoBackButton: React.FC<Props> = (props) => {
    // Props
    const { onPress } = props;

    //======================================================================================================================
    // Render
    //======================================================================================================================

    return (
        <Container onPress={onPress}>
            <CText color={"white"} bold>
                {strings().goBackButtonText}
            </CText>
        </Container>
    );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-top: 3px;
  margin-left: 3px;
`;

export default GoBackButton;
