import React, { useState, useRef } from "react";
import ShowBackButton from "../searchShowBackButton";
import FriendsSearchInput from "../searchInput";
import { Box, Grow, Paper, Typography, useTheme } from "@mui/material";
import FriendsSuggestionList from "@/app/profile/components/friend-suggestion";
import LottieLoading from "@/components/lottieLoading";
import { searchFriends } from "@/app/profile/api";
import * as lottieAnimation from "@/public/lottie-files/searching.json";
import * as noResult from "@/public/lottie-files/no-result.json";

import "./style.scss";
import SearchAndNotFound from "@/app/profile/components/searchAndNotFound";
let timeout = 0;
type SearchResultsStateType = {
  openTheSearchPart: boolean;
  showBackButton: boolean;
  items: Array<any>;
  searchTotal: number;
  page: number;
  pageSize: number;
  cleanWholeTextButton: boolean;
  notFound: boolean;
  searchedText: string;
  stopScrolling: boolean;
  checked: boolean;
  loading: boolean;
};
function FriendSearchParts() {
  const listRef = useRef();
  const theme = useTheme() as any;
  const [searchState, setSearchState] = useState<SearchResultsStateType>({
    openTheSearchPart: false,
    showBackButton: false,
    items: [],
    searchTotal: 0,
    page: 2,
    pageSize: 25,
    cleanWholeTextButton: false,
    notFound: false,
    searchedText: "",
    stopScrolling: false,
    checked: false,
    loading: false,
  });

  function showBackButtonAndResults() {
    setSearchState((prev) => ({
      ...prev,
      showBackButton: true,
      // notFound: false,
      openTheSearchPart:
        searchState.items.length > 0 || searchState.notFound === true
          ? false
          : true,
      checked: true,
    }));
  }

  function onlyRemoveInputText() {
    setSearchState((prev) => ({
      ...prev,
      notFound: false,
      cleanWholeTextButton: false,
      searchedText: "",
      items: [],
      stopScrolling: false,
      openTheSearchPart: true,
    }));
  }
  function hideTextAndSearchResults() {
    setSearchState((prev) => ({
      ...prev,
      showBackButton: false,
      notFound: false,
      searchedText: "",
      items: [],
      cleanWholeTextButton: false,
      stopScrolling: false,
      checked: false,
      // with openTheSearchPart here we lose the animation
      openTheSearchPart: false,
    }));
  }
  function doSearch(event: any) {
    setSearchState((prev) => ({
      ...prev,
      searchedText: event.target.value,
    }));
    if (timeout) clearTimeout(timeout);
    if (event.target.value !== "") {
      setSearchState((prev) => ({
        ...prev,
        cleanWholeTextButton: true,
      }));
      timeout = setTimeout(function () {
        setSearchState((prev) => ({
          ...prev,
          loading: true,
        }));
        searchFriends(event.target.value, 1, 25)
          .then(function (response) {
            listRef?.current?.scrollTo(0, 0);
            if (response.data.students.length > 0) {
              setSearchState((prev) => ({
                ...prev,
                notFound: false,
                items: response.data.students,
                searchTotal: response.data.pagination.total,
                page: 2,
                pageSize: response.data.pagination.page_size,
                openTheSearchPart: false,
                loading: false,
              }));
            } else {
              setSearchState((prev) => ({
                ...prev,
                notFound: true,
                openTheSearchPart: false,
                loading: false,
              }));
            }
          })
          .catch((err) => {
            setSearchState((prev) => ({
              ...prev,
              loading: false,
            }));
          });
      }, 1500);
    } else {
      setSearchState((prev) => ({
        ...prev,
        notFound: false,
        cleanWholeTextButton: false,
        items: [],
        openTheSearchPart: true,
        stopScrolling: false,
      }));
    }
  }

  function handleSearchScroll() {
    if (
      searchState.items.length === searchState.searchTotal ||
      searchState.stopScrolling === true ||
      searchState.cleanWholeTextButton === false
    ) {
      // console.log("stop scrolling ");
    } else {
      if (
        listRef.current?.scrollTop + listRef.current?.clientHeight >=
        listRef.current?.scrollHeight
      ) {
        setSearchState((prev) => ({
          ...prev,
          loading: true,
        }));
        searchFriends(
          searchState.searchedText,
          searchState.page,
          searchState.pageSize
        )
          .then((res) => {
            if (res.data.students !== undefined) {
              setSearchState((prev) => ({
                ...prev,
                items: searchState.items.concat(res.data.students),
                page: searchState.page + 1,
                pageSize: res?.data?.pagination?.page_size,
                loading: false,
              }));
            } else {
              setSearchState((prev) => ({
                ...prev,
                stopScrolling: true,
                loading: false,
              }));
            }
          })
          .catch((err) => {
            console.log(err);
            setSearchState((prev) => ({
              ...prev,
              loading: false,
            }));
          });
      }
    }
  }

  return (
    <>
      <Box
        className="suggested-friend-search-input"
        sx={{ backgroundColor: "background.main" }}
      >
        <FriendsSearchInput
          doSearchFunction={doSearch}
          searchedTextByUser={searchState.searchedText}
          showBackButtonAndResults={showBackButtonAndResults}
          cleanWholeTextButton={searchState.cleanWholeTextButton}
          onlyRemoveInputText={onlyRemoveInputText}
        />
        {searchState.showBackButton && (
          <ShowBackButton hideTextAndSearchResults={hideTextAndSearchResults} />
        )}
      </Box>
      <Box
        className="suggested-friend-search-results"
        sx={{ zIndex: searchState.showBackButton ? "10" : "-1" }}
        onScroll={handleSearchScroll}
        ref={listRef}
      >
        <LottieLoading
          open_lottie={searchState.loading}
          customLoading={true}
          lottie_className="suggested-friends-searchLoading"
        />
        <Grow in={searchState.checked}>
          <Paper
            sx={{ backgroundColor: theme.palette.white.flexible }}
            className="suggested-results"
          >
            {searchState.openTheSearchPart ? (
              <SearchAndNotFound
                state={searchState.showBackButton}
                mainTitle="به دنبال دوستانت در زبان آموز بگرد"
                subTitle=" می‌تونی با جستجوی شماره ، نام کاربری یا ایمیل دوستاتو پیدا کنی"
                animationData={lottieAnimation}
              />
            ) : searchState.notFound === true ? (
              <SearchAndNotFound
                state={searchState.notFound}
                mainTitle="نتیجه ای پیدا نشد"
                subTitle="مطمئن شو نام، نام کاربری، شماره یا ایمیل دوستتو درست وارد کرده باشی"
                animationData={noResult}
              />
            ) : (
              <>
                {searchState.items.length > 0 ? (
                  <Typography
                    className="search-result-title"
                    sx={{
                      backgroundColor: theme.palette.white.flexible,
                      color: theme.palette.gray["1"],
                    }}
                  >
                    {`(${searchState.items.length}) ${searchState.searchedText} نتایج جستجو برای `}
                  </Typography>
                ) : (
                  <></>
                )}

                <FriendsSuggestionList
                  listOfFriends={searchState.items}
                  showDeleteButton={false}
                />
              </>
            )}
          </Paper>
        </Grow>
      </Box>
    </>
  );
}

export default FriendSearchParts;
