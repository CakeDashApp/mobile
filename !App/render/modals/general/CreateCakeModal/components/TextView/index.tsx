import React, {useContext, useEffect, useState} from "react";
import { View } from "react-native";
import NameInput from "./components/NameInput";
import DescriptionInput from "./components/DescriptionInput";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const TextView: React.FC<Props> = (props) => {
  // Props
  const { showInputError, onBlur, onFocus } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Is Focused
  const [descriptionIsFocused, setDescriptionIsFocused] = useState<boolean>(
    false
  );
  const [nameIsFocused, setNameIsFocused] = useState<boolean>(false);

  //======================================================================================================================
  // Handle Is Focused
  //======================================================================================================================

  useEffect(() => {
    if (descriptionIsFocused || nameIsFocused) onFocus();
    else onBlur();
  }, [descriptionIsFocused, nameIsFocused]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <NameInput
        showInputError={showInputError}
        onFocus={() => setNameIsFocused(true)}
        onBlur={() => setNameIsFocused(false)}
      />
      <DescriptionInput
        showInputError={showInputError}
        onFocus={() => setDescriptionIsFocused(true)}
        onBlur={() => setDescriptionIsFocused(false)}
      />
    </View>
  );
};

export default TextView;
