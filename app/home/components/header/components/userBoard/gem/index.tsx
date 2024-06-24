import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import { IStudentData } from "@/models/studentData.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";

function Gem() {
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const studentTotalGem =
    studentData?.attributes?.data?.find((item: any) => item?.name === "gem")
      ?.value || 0;

  const { wholeStudentRemaindGems } = useSelector(
    (state: RootReduxState) => state.shop
  );

  return (
    <div className="gem-item">
      <Typography sx={{ color: "system.blue" }}>
        {new Intl.NumberFormat("en-US").format(
          Number(
            wholeStudentRemaindGems === 0
              ? studentTotalGem
              : wholeStudentRemaindGems
          )
        )}
      </Typography>
      <Image src="/svg/diamond.svg" width={20} height={20} alt="" />
    </div>
  );
}

export default Gem;
