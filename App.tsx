import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import core from "./!App/src/core";
import Navigator from "./!App/navigation";
import DropdownAlert from "react-native-dropdownalert";
import { DropDownHolder } from "./!App/render/components/project/DropDownHolder";
import { useDarkModeContext } from "react-native-dark-mode";
import ThemeContext from "./!App/context/ThemeContext";
import { useAgile } from "@agile-ts/react";

const App = () => {
  // Theme
  const theme = useAgile(core.ui.THEME, "App.tsx");
  const deviceTheme = useDarkModeContext();

  // Start Keyboard Listener
  useEffect(() => {
    core.helper.platform.keyboard.startListener();
  }, []);

  // Handle Device Theme
  useEffect(() => {
    core.ui.setTheme(deviceTheme);
  }, [deviceTheme]);

  // Render
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
        <Navigator />
        <DropdownAlert
          ref={(ref) => DropDownHolder.setDropDown(ref)}
          successImageSrc={-1}
          successColor={theme?.colors.success}
          errorImageSrc={-1}
          errorColor={theme?.colors.error}
          warnImageSrc={-1}
          infoImageSrc={-1}
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
