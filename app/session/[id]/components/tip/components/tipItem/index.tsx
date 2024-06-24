import React from "react";

import Header from "../header";
import Space from "../space";
import Text from "../text";
import TipsTable from "../table";
import Seperator from "../separator";
import Media from "../media";
import Example from "../example";
import Dialogue from "../dialogue";

const views = {
  header: Header,
  space: Space,
  text: Text,
  table: TipsTable,
  seperator: Seperator,
  media: Media,
  example: Example,
  dialogue: Dialogue,
};

function TipItem({ data }: { data: Contentbody }) {
  const CurrentView = views[data.type];
  return <CurrentView data={data} />;
}

export default TipItem;
