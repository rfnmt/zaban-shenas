import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import { claimReward } from "@/app/profile/api";
import LottieLoading from "@/components/lottieLoading";
import GetReward from "./components/getReward";
import RewardAquierd from "./components/rewardAquierd";

function Achievement() {
  const { id } = useSelector((state: RootReduxState) => state.claimRewards);

  const [typeOfField, setTypeOfField] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    claimReward({
      claim_reward: {
        id: id,
      },
    })
      .then((res) => {
        setTypeOfField(res.data.field);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <LottieLoading open_lottie={loading} />
      {!loading &&
        (typeOfField === "claimed" ? (
          <GetReward />
        ) : typeOfField === "id" ? (
          <RewardAquierd />
        ) : (
          <></>
        ))}
    </>
  );
}

export default Achievement;
