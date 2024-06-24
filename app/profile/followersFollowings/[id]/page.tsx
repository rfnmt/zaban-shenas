"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { userFollowingAndFollowers } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { setDataForFollowersOrFollowing } from "@/providers/Redux/general/generalSlice";
import FriendsSuggestionList from "../../components/friend-suggestion";
import { commonFramerMotionVariant } from "@/modules/helper";
import FriendsSearchInput from "../../suggestedFriends/components/searchInput";
import LottieLoading from "@/components/lottieLoading";
import { usePathname } from "next/navigation";
import FollowEmptyList from "./components/followEmptyList";
import * as noResult from "@/public/lottie-files/no-result.json";
import SearchAndNotFound from "@/app/profile/components/searchAndNotFound";
let timeout = 0;
function FollowersFollowingsPage() {
  const pathID = usePathname().split("/")[3];
  const listRef = useRef();
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const { followersOrFollowing } = useSelector(
    (state: RootReduxState) => state.general
  );
  const [value, setValue] = React.useState(
    followersOrFollowing === "followers" ? 0 : 1
  );

  const [state, setState] = useState({
    searchedText: "",
    cleanWholeTextButton: false,
    items: [],
    notFound: false,
    searchTotalPagination: 0,
    page: 2,
    pageSize: 25,
    pagination: 0,
    stopScrolling: false,
    searchAndScrollLoading: false,
    initialLoading: true,
  });
  // const {
  //   data: friendsData,
  //   isLoading,
  //   status,
  // } = useQuery({
  //   queryKey: [
  //     "followers-following",
  //     Number(pathID),
  //     followersOrFollowing,
  //     "",
  //     1,
  //     25,
  //   ],
  //   queryFn: () =>
  //     userFollowingAndFollowers(
  //       Number(pathID),
  //       followersOrFollowing,
  //       "",
  //       1,
  //       25
  //     ),
  // });
  // useEffect(() => {
  //   if (status === "success") {
  //     setState((prev) => ({
  //       ...prev,
  //       items: friendsData?.data?.students,
  //     }));
  //   } else {
  //     setState((prev) => ({
  //       ...prev,
  //       items: [],
  //     }));
  //   }
  // }, [status, friendsData]);

  useEffect(() => {
    setState((prev) => ({ ...prev, initialLoading: true }));
    userFollowingAndFollowers(Number(pathID), followersOrFollowing, "", 1, 25)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          searchedText: "",
          cleanWholeTextButton: false,
          items: res?.data?.students,
          notFound: false,
          initialLoading: false,
          searchTotalPagination: 0,
          page: 2,
          pageSize: res.data.pagination?.page_size,
          pagination: res?.data?.pagination?.total,
          stopScrolling: false,
        }));
      })
      .catch(() =>
        setState((prev) => ({
          ...prev,
          items: [],
          initialLoading: false,
        }))
      );
  }, [followersOrFollowing]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    listRef?.current?.scrollTo(0, 0);
    setValue(newValue);
    dispatch(
      setDataForFollowersOrFollowing(newValue === 0 ? "followers" : "following")
    );
  };

  function onlyRemoveInputText() {
    listRef?.current?.scrollTo(0, 0);
    userFollowingAndFollowers(
      Number(pathID),
      followersOrFollowing,
      "",
      1,
      25
    ).then((res) => {
      setState((prev) => ({
        ...prev,
        searchedText: "",
        cleanWholeTextButton: false,
        notFound: false,
        items: res?.data?.students,
        stopScrolling: false,
        page: 2,
        pageSize: 25,
        pagination: res.data.pagination?.total,
      }));
    });
  }

  function doSearch(event: any) {
    setState((prev) => ({
      ...prev,
      searchedText: event.target.value,
    }));
    if (timeout) clearTimeout(timeout);
    if (event.target.value !== "") {
      setState((prev) => ({
        ...prev,
        cleanWholeTextButton: true,
      }));
      timeout = setTimeout(function () {
        setState((prev) => ({
          ...prev,
          searchAndScrollLoading: true,
        }));
        userFollowingAndFollowers(
          Number(pathID),
          followersOrFollowing,
          event.target.value,
          1,
          25
        )
          .then(function (response) {
            // console.log(response.data);
            listRef?.current?.scrollTo(0, 0);
            if (response.data.students.length > 0) {
              setState((prev) => ({
                ...prev,
                notFound: false,
                searchAndScrollLoading: false,
                items: response.data.students,
                searchTotalPagination: response.data.pagination.total,
                page: 2,
                pageSize: response.data.pagination.page_size,
              }));
            } else {
              setState((prev) => ({
                ...prev,
                notFound: true,
                searchAndScrollLoading: false,
              }));
            }
          })
          .catch((err) => {
            setState((prev) => ({
              ...prev,
              searchAndScrollLoading: false,
            }));
          });
      }, 1500);
    } else {
      listRef?.current?.scrollTo(0, 0);
      userFollowingAndFollowers(
        Number(pathID),
        followersOrFollowing,
        "",
        1,
        25
      ).then((res) => {
        setState((prev) => ({
          ...prev,
          searchedText: "",
          cleanWholeTextButton: false,
          notFound: false,
          items: res?.data?.students,
          stopScrolling: false,
          page: 2,
          pageSize: 25,
          pagination: res?.data?.pagination?.total,
        }));
      });
    }
  }

  function handleSearchScroll() {
    if (
      state.items.length === state.pagination ||
      state.stopScrolling === true ||
      state.items.length === state.searchTotalPagination
    ) {
      // console.log("stop scrolling");
    } else {
      if (
        listRef.current?.scrollTop + listRef.current?.clientHeight >=
        listRef.current?.scrollHeight
      ) {
        setState((prev) => ({
          ...prev,
          searchAndScrollLoading: true,
        }));
        userFollowingAndFollowers(
          Number(pathID),
          followersOrFollowing,
          state.searchedText === "" ? "" : state.searchedText,
          state.page,
          state.pageSize
        )
          .then((res) => {
            if (res.data.students !== undefined) {
              setState((prev) => ({
                ...prev,
                items: state.items.concat(res.data.students),
                page: state.page + 1,
                pageSize: res.data.pagination.page_size,
                searchAndScrollLoading: false,
              }));
            } else {
              setState((prev) => ({
                ...prev,
                stopScrolling: true,
                searchAndScrollLoading: false,
              }));
            }
          })
          .catch((err) => {
            console.log(err);
            setState((prev) => ({
              ...prev,
              searchAndScrollLoading: false,
            }));
          });
      }
    }
  }

  return (
    <>
      <Box
        className="tabs-search-wrapper container"
        sx={{ backgroundColor: theme.palette.background.main }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          <Tab
            label="دنبال کننده"
            sx={{
              color: theme.palette.gray["1"],
              borderBottom: `1px solid ${theme.palette.gray["3"]} !important`,
            }}
          />
          <Tab
            label="دنبال شونده"
            sx={{
              color: theme.palette.gray["1"],
              borderBottom: `1px solid ${theme.palette.gray["3"]} !important`,
            }}
          />
        </Tabs>
        <FriendsSearchInput
          doSearchFunction={doSearch}
          searchedTextByUser={state.searchedText}
          cleanWholeTextButton={state.cleanWholeTextButton}
          onlyRemoveInputText={onlyRemoveInputText}
        />
      </Box>
      <Box>
        <LottieLoading
          open_lottie={state.initialLoading}
          lottie_className="follow-loading"
        />
        <LottieLoading
          open_lottie={state.searchAndScrollLoading}
          customLoading={true}
          lottie_className="follow-loading"
        />
        <motion.div {...commonFramerMotionVariant} className="page-animation">
          <Box
            onScroll={handleSearchScroll}
            ref={listRef}
            className="follow-list-wrapper"
          >
            {state.notFound === true ? (
              <SearchAndNotFound
                state={state.notFound}
                animationData={noResult}
                mainTitle="نتیجه ای پیدا نشد"
                subTitle="مطمئن شو نام، نام کاربری، شماره یا ایمیل دوستتو درست وارد کرده باشی"
              />
            ) : state.initialLoading === false ? (
              state.items.length !== 0 ? (
                <FriendsSuggestionList
                  listOfFriends={state.items}
                  pagination={state.pagination}
                  searchTotalPagination={state.searchTotalPagination}
                  showDeleteButton={false}
                />
              ) : (
                <FollowEmptyList />
              )
            ) : (
              <></>
            )}
          </Box>
        </motion.div>
      </Box>
    </>
  );
}

export default FollowersFollowingsPage;
