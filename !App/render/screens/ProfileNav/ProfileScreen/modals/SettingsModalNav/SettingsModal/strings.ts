import core from "../../../../../../../src/core";

// Interface
interface StringsInterface {
  settingsTitle: string;
  settingsSubTitle: string;
  settingsAppButtonTitle: string;
  settingsAppButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    settingsTitle: "Settings",
    settingsSubTitle: "Version ${version}",
    settingsAppButtonTitle: "App",
    settingsAppButtonText: "Dark Mode, Langauge, Resources",
  },
  de: {
    settingsTitle: "Einstellungen",
    settingsSubTitle: "Version ${version}",
    settingsAppButtonTitle: "App",
    settingsAppButtonText: "Dark Mode, Sprache, Resources",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
