import core from "../../../../../../src/core";

// Interface
interface StringsInterface {
  todoTitle: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    todoTitle: "TODO",
  },
  de: {
    todoTitle: "TODO",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}
