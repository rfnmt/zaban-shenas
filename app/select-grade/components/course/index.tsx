import React, { useMemo } from "react";

import { ICourse } from "@/app/select-grade/interfaces";
import AsLink from "./components/asLink";
import AsButton from "./components/asButton";

type Props = { data: ICourse };

function Course({ data }: Props) {
  const view = useMemo(() => {
    if (data?.sub_courses.length) {
      return <AsLink data={data} />;
    } else {
      return <AsButton data={data} />;
    }
  }, [data]);

  return view;
}

export default Course;
