import {
  Fade,
  Paper,
  Popper,
  Table,
  TableContainer,
  useTheme,
  ClickAwayListener,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { setOpen } from "@/providers/Redux/hintTable/hintTableSlice";
import { RootReduxState } from "@/providers/Redux/store";
import PopoverTableBody from "@/components/textProcessing/hintTable/popoverTableBody";
import PopoverTableHeader from "@/components/textProcessing/hintTable/popoverTableHeader";

import "./hintTable.scss";

function HintTable() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { open, anchorEl, data } = useSelector(
    (state: RootReduxState) => state.hintTable
  );

  function clickAwayHandler(e) {
    if (!anchorEl) {
      dispatch(setOpen(false));
    } else {
      if (e?.target?.matches(".has-hint-table")) {
        dispatch(setOpen(true));
      } else {
        dispatch(setOpen(false));
      }
    }
  }

  const element = document?.getElementById(anchorEl) || null;

  return (
    <ClickAwayListener onClickAway={clickAwayHandler}>
      <Popper
        open={open}
        anchorEl={element}
        placement="bottom"
        transition
        className="table-popover"
        sx={{
          "& .MuiPaper-root": {
            border: `1px solid ${theme.palette.border.main}`,
            boxShadow: "unset !important",
            borderRadius: "10px !important",
            backgroundColor: "background.main",
          },
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <audio src={data?.pronunciation?.audio} autoPlay />
              <TableContainer>
                <Table>
                  <PopoverTableHeader tableHeader={data?.table?.headers} />
                  <PopoverTableBody tableRows={data?.table?.rows} />
                </Table>
              </TableContainer>
            </Paper>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
}

export default HintTable;
