import { store } from "@/providers/Redux/store";
import theme from "@/modules/theme/themes";

export function characterStyles(attributes: any) {
  const { mode } = store.getState().general;

  let _mode = "";
  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  const _theme = theme(_mode);

  const attrs = {};

  for (let key in attributes) {
    let property = attributes[key];

    key = key.replace(/[^a-z][a-z]/gi, (word) =>
      word.toUpperCase().replace(/[^a-z]/gi, "")
    );

    if (key === "alignment") key = "textAlign";
    if (key === "lineSpacing") {
      key = "lineHeight";
      attrs[key] = property + "px";
      break;
    }
    if (key === "fontFamily" && property === "HelveticaNeue")
      property = "Helvetica";
    if (key === "fontFamily" && property === "IransansFaNum")
      property = "IRANSans";
    if (key === "textColor") {
      key = "color";
      property = property.replaceAll("_", ".");
      property = property.split(".");
      if (property[0].startsWith("accent"))
        attrs[key] =
          _theme?.palette[String(property[0]) + String(property[1])][
            property[2]
          ];
      else if (
        property[0].startsWith("secondary") ||
        property[0].startsWith("primary") ||
        property[0].startsWith("system") ||
        property[0].startsWith("grey")
      ) {
        attrs[key] = _theme?.palette[String(property[0])][String(property[1])];
      } else if (/^[a-zA-Z]+$/.test(property[0])) attrs[key] = property[0];
      else {
        attrs[key] = `${property[0]}`;
      }
    } else {
      attrs[key] = property;
    }
  }

  return attrs;
}
