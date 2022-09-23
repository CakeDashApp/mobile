import core from "../../../../src/core";
import React from "react";

// Interface
interface StringsInterface {
  cancelButtonText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    cancelButtonText: "Cancel"
  },
  de: {
    cancelButtonText: "Zurück"
  }
};

export default function() {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
