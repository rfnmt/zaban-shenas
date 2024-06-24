"use client";
import React, { useEffect, useState } from "react";
import { getIntroduceingToFriends } from "../api";
import LottieLoading from "@/components/lottieLoading";
import FriendsSuggestionList from "@/app/profile/components/friend-suggestion";
import "./invited-friends-list.scss";

function InvitedFriendsList() {
  const [studentsState, setStudentsState] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getIntroduceingToFriends()
      .then((res) => {
        setStudentsState((prev) => ({
          ...prev,
          loading: false,
          items: res.data.students,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LottieLoading
        open_lottie={studentsState.loading}
        lottie_className="invited-friends-loading "
      />
      <FriendsSuggestionList
        listOfFriends={studentsState.items}
        showDeleteButton={false}
      />
    </>
  );
}

export default InvitedFriendsList;
