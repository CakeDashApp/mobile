import core from "../../../../src/core";

// Interface
interface StringsInterface {
  imagesTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    imagesTitle: "Images",
  },
  de: {
    imagesTitle: "Bilder",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
