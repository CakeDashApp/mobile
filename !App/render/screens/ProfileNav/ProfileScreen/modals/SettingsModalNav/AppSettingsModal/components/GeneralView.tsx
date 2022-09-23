import React, {useCallback, useContext, useState} from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";
import SettingsActionItem from "../../components/SettingsActionItem";
import * as controller from "../controller";
import CBottomSelector from "../../../../../../../components/default/cBottomSelector";
import CText from "../../../../../../../components/default/cText";
import core from "../../../../../../../../src/core";
import strings from "../strings";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {}

const GeneralView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  // DarkMode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(theme.type === "dark");

  // Language
  const languageCode = useAgile(core.other.LANGUAGE);
  const [LANGUAGE_KEY] = useState({ german: "DE", english: "EN" });

  //======================================================================================================================
  // On Toggle Dark Mode
  //======================================================================================================================

  const onToggleDarkModeSwitch = useCallback(() => {
    // New Dark Mode
    const newIsDarkMode = !isDarkMode;

    // Change Theme
    controller.changeTheme(newIsDarkMode ? "dark" : "light");

    setIsDarkMode(newIsDarkMode);
  }, [isDarkMode, controller.changeTheme]);

  //======================================================================================================================
  // On Language Change
  //======================================================================================================================

  const onLanguageChange = useCallback(
    (options: { key: string | number; label: string }) => {
      // Get New Language Code
      let newLanguageCode = languageCode;
      switch (options.key) {
        case LANGUAGE_KEY.german:
          newLanguageCode = "de";
          break;
        case LANGUAGE_KEY.english:
          newLanguageCode = "en";
          break;
      }

      // Change Language
      controller.changeLanguage(newLanguageCode);
    },
    [languageCode, controller.changeLanguage]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <CText bold color={theme.colors.on_surface_2}>
        {strings().generalTitle}
      </CText>
      <ActionItem
        title={strings().darkModeTitle}
        subtitle={strings().darkModeText}
        color={isDarkMode ? "#ffffff" : "#000000"}
        iconColor={isDarkMode ? "#000000" : "#ffffff"}
        icon={"moon"}
      >
        <Switch onValueChange={onToggleDarkModeSwitch} value={isDarkMode} />
      </ActionItem>
      <Separator />
      <CBottomSelector
        items={[
          {
            key: LANGUAGE_KEY.english,
            label: strings().englishButtonText,
          },
          {
            key: LANGUAGE_KEY.german,
            label: strings().germanButtonText,
          },
        ]}
        onChange={onLanguageChange}
        cancel
      >
        <ActionItem
          title={strings().languageTitle}
          subtitle={strings().languageText}
          color={"#ffd700"}
          icon={"fileText"}
        >
          <CText bold size={15} color={theme.colors.on_background}>
            {languageCode && languageCode.toLocaleUpperCase()}
          </CText>
        </ActionItem>
      </CBottomSelector>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-bottom: 30px;
`;

const ActionItem = styled(SettingsActionItem)`
  margin: 10px 0;
`;

const Separator = styled.View<{ theme: ThemeInterface }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.on_surface};
  margin: 5px 0;
`;

export default GeneralView;
