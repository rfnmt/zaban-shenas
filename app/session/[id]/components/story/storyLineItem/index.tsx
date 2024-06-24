import React, { useEffect } from "react";
import { Box } from "@mui/material";
import LeftToRightStoryLineItem from "./leftToRightStoryLineItem";
import RightToLeftStoryLineItem from "./rightToLeftStoryLineItem";
import "./style.scss";
import { useDispatch } from "react-redux";
import { triggerStoryButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";

type StoryLineItemData = {
  story_line_item_data: any;
  index: number;
};

function StoryLineItem({ story_line_item_data, index }: StoryLineItemData) {
  const dispatch = useDispatch();
  const {
    line_element: { character, line_type, text, tts, visual_direction },
  } = story_line_item_data;

  useEffect(() => {
    if (tts === null) {
      dispatch(triggerStoryButtonEnable(true));
    } else {
      dispatch(triggerStoryButtonEnable(false));
    }
  }, []);

  return (
    <Box
      className="story-line-item-wrapper"
      sx={
        story_line_item_data.line_element?.id
          ? { marginTop: "54.5px" }
          : { marginTop: "24px" }
      }
    >
      {visual_direction === "left-to-right" ? (
        <LeftToRightStoryLineItem
          line_type={line_type}
          character={character}
          tts={tts}
          index={index}
          text={text}
          lineElementID={story_line_item_data.line_element?.id}
          parent={story_line_item_data?.whatIsParent}
        />
      ) : (
        <RightToLeftStoryLineItem
          line_type={line_type}
          character={character}
          tts={tts}
          index={index}
          text={text}
          lineElementID={story_line_item_data.line_element?.id}
          parent={story_line_item_data?.whatIsParent}
        />
      )}
    </Box>
  );
}

export default StoryLineItem;
