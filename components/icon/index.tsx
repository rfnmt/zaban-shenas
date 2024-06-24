import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props: IconProps) => (
  <IcoMoon
    style={{ stroke: "unset", fill: "unset" }}
    iconSet={iconSet}
    {...props}
  />
);

export default Icon;
