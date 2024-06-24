import React, { Key, useEffect } from "react";
import { Box } from "@mui/material";
import Sheet from "react-modal-sheet";
import { useSelector, useDispatch } from "react-redux";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootReduxState } from "@/providers/Redux/store";
import { useTipQuery } from "./hook/useTipQuery";
import TipItem from "@/app/session/[id]/components/tip/components/tipItem";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import { updateVisibleTipBottomSheet } from "@/providers/Redux/general/generalSlice";
import "./style.scss";

function TipBottomSheet() {
  const dispatch = useDispatch();
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );
  const { visibleTipBottomSheet } = useSelector(
    (state: RootReduxState) => state.general
  );

  const relatedTipId = allQuestion[currentQuestionIndex]?.data?.related_tip;
  const cachedTipData = queryClient.getQueryData(["tip", relatedTipId]) as any;

  const { refetch: fetchTipData, isLoading } = useTipQuery(relatedTipId);

  useEffect(() => {
    if (cachedTipData === undefined) fetchTipData();
  }, [cachedTipData]);

  return (
    <>
      <Sheet
        onClose={() => dispatch(updateVisibleTipBottomSheet(false))}
        isOpen={visibleTipBottomSheet}
        className="tip-bottomsheet"
        detent="full-height"
        id="tip-bottomsheet"
      >
        <Sheet.Container>
          <Sheet.Header>
            <NavigateToBack
              title={
                Object.keys(cachedTipData || {}).length
                  ? cachedTipData?.tips[0]?.data?.title
                  : "بدون عنوان"
              }
              type="withBackAndMoreIcon"
            />
          </Sheet.Header>

          <Sheet.Content>
            <Box
              display="flex"
              bgcolor="background.main"
              className="tips-wrapper"
              id="main-pages-screenshot"
            >
              {isLoading ? (
                <div>loading</div>
              ) : (
                <div className="container-without-padding">
                  <div id="tip-contents">
                    <div className="tip-items">
                      {Object.keys(cachedTipData).length
                        ? cachedTipData?.tips[0]?.data?.content_body?.map(
                            (item: Contentbody, key: Key) => {
                              return <TipItem data={item} key={key} />;
                            }
                          )
                        : ""}
                    </div>
                  </div>
                </div>
              )}
            </Box>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={() => dispatch(updateVisibleTipBottomSheet(false))}
        />
      </Sheet>
    </>
  );
}

export default TipBottomSheet;
