import React from "react";
import core from "../src/core";
import {ThemeInterface} from "../src/core/controllers/ui/interfaces";

export default React.createContext<ThemeInterface>(core.ui.THEME.value);
