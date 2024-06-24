"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  friendSuggestionsApi,
  removeFriendFromFriendSuggestionList,
  putMethodRelationShip,
} from "../api";
import LottieLoading from "@/components/lottieLoading";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useSpecificStudentsAPI } from "@/app/profile/hook";
import FriendsSuggestionList from "../components/friend-suggestion";
import FriendSearchParts from "./components/friendsSearchPart";
import { commonFramerMotionVariant } from "@/modules/helper";
import { motion } from "framer-motion";
import SearchAndNotFound from "../components/searchAndNotFound";
import * as lottieAnimation from "@/public/lottie-files/searching.json";
import "./style.scss";

function SuggestedFriendsPage() {
  const theme = useTheme() as any;
  const ref = useRef(null);
  const [state, setState] = useState({
    items: [],
    total: 0,
    page: 2,
    pageSize: 25,
    stopScrolling: false,
    firstLoading: true,
    itemsLoading: false,
  });

  useEffect(() => {
    friendSuggestionsApi(1, 25).then((res) => {
      setState((prev) => ({
        ...prev,
        items: res.data.students,
        total: res.data.pagination.total,
        pageSize: res.data.pagination.page_size,
        firstLoading: false,
      }));
    });
  }, []);

  const handleListScroll = () => {
    if (state.items.length === state.total || state.stopScrolling === true) {
      // console.log("stop scrolling");
    } else {
      if (
        ref.current?.scrollTop + ref.current?.clientHeight >=
        ref.current?.scrollHeight
      ) {
        setState((prev) => ({ ...prev, itemsLoading: true }));
        friendSuggestionsApi(state.page, state.pageSize)
          .then((res) => {
            if (res.data.students !== undefined) {
              setState((prev) => ({
                ...prev,
                itemsLoading: false,
                items: state.items.concat(res.data.students),
                page: state.page + 1,
                pageSize: res.data.pagination.page_size,
              }));
            } else {
              setState((prev) => ({
                ...prev,
                stopScrolling: true,
                itemsLoading: false,
              }));
            }
          })
          .catch((err) => {
            console.log(err);
            setState((prev) => ({
              ...prev,
              itemsLoading: false,
            }));
          });
      }
    }
  };

  function handleRefuseFriend(friendId: number) {
    removeFriendFromFriendSuggestionList({ uid: friendId }).then((res) => {
      const newListOfStudents = state.items.filter(
        (item: any) => item.id !== friendId
      );
      setState((prev) => ({
        ...prev,
        items: newListOfStudents,
      }));
    });
  }

  return (
    <>
      <FriendSearchParts />
      <LottieLoading
        open_lottie={state.firstLoading}
        lottie_className="suggested-friends-loading"
      />
      <LottieLoading
        open_lottie={state.itemsLoading}
        lottie_className="suggested-friends-loading"
        customLoading={state.itemsLoading}
      />
      {state.firstLoading === false ? (
        <motion.div
          {...commonFramerMotionVariant}
          className="suggested-friends-animation"
        >
          {state.items.length > 0 ? (
            <Box
              className="suggested-friendList"
              onScroll={handleListScroll}
              ref={ref}
            >
              <Typography
                sx={{ color: theme.palette.gray["1"] }}
                className="suggested-friends-title"
              >
                دوستان پیشنهاد شده
              </Typography>

              <FriendsSuggestionList
                listOfFriends={state.items}
                handleRefuseFriend={handleRefuseFriend}
                showDeleteButton={true}
              />
            </Box>
          ) : (
            <SearchAndNotFound
              state={true}
              mainTitle="به دنبال دوستانت در زبان آموز بگرد"
              subTitle=" می‌تونی با جستجوی شماره ، نام کاربری یا ایمیل دوستاتو پیدا کنی"
              animationData={lottieAnimation}
            />
          )}
        </motion.div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SuggestedFriendsPage;
