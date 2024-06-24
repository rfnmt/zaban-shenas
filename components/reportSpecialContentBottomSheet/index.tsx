import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import {
  handleGetReportCategoryTitle,
  handleOpentReportSpecialContentBottomSheet,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";
import Sheet from "react-modal-sheet";
import CommonBottomSheetHeader from "../commonBottomSheetHeader";
import LottieLoading from "../lottieLoading";
// import { RootReduxState } from "@/providers/Redux/store";
import { reportSpecialData } from "./api";
import { usePathname } from "next/navigation";
import ReportTextArea from "./reportTextArea/reportTextArea";
import ImageAndRemoveButton from "./imageAndRemoveButton/imageAndRemoveButton";
import UploadReportedFile from "./uploadReportedFile";
import html2canvas from "html2canvas";
import CommonErrorSnackBar from "@/app/profile/components/errorSnackBar";
import CommonSuccessSnackBar from "@/app/profile/components/successSnackbar";
import "./style.scss";

function ReportSpecialContentBottomSheet() {
  const imgInputRef = useRef();
  const exportRef = useRef();
  const dispatch = useDispatch();
  const [images, setImages] = useState([] as any);
  const pathname = usePathname();
  const [comment, setComment] = useState<string>("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);

  const {
    opentReportSpecialContentBottomSheet,
    getReportCategoryTitle,
    getElementIdForReportScreenShot,
    visibleTipBottomSheet,
    getReportCategoryType,
    getSpecialIdForReport,
  } = useSelector((state: any) => state.general);

  function handleCloseSpecialReport() {
    setComment("");
    dispatch(handleOpentReportSpecialContentBottomSheet(false));
    dispatch(updateGetSpecialIdForReport(null));
    dispatch(updateFlagIconWhichOpensReportBottomSheet(false));
    setImages([]);
    dispatch(handleGetReportCategoryTitle(""));
  }

  const message = `توضیح کاربر: ${comment}\n نسخه: وب`;
  function reportType() {
    if (pathname.split("/")[2] === "report") {
      return "general";
    } else if ([...new Set(pathname.split("/"))].length === 1) {
      return "session";
    } else {
      return getReportCategoryType;
    }
  }

  function submitReportBottomSheet() {
    setOpenLoading(true);

    const formData = new FormData();

    for (const image of images) {
      formData.append("attachments", image);
    }

    formData.set("title", getReportCategoryTitle);
    getSpecialIdForReport
      ? formData.set("id", String(getSpecialIdForReport))
      : null;

    formData.set("type", reportType());
    formData.set("details", message);
    formData.set("student_answer", "");
    formData.set("reported_comment_link", "");

    reportSpecialData({
      data: formData,
    })
      .then((res) => {
        setOpenLoading(false);
        setComment("");
        dispatch(handleOpentReportSpecialContentBottomSheet(false));
        dispatch(updateGetSpecialIdForReport(null));
        setOpenSuccessSnackbar(true);
        dispatch(handleGetReportCategoryTitle(""));
        setImages([]);
      })
      .catch((err) => {
        setOpenLoading(false);
        setOpenErrorSnackbar(true);
      });
  }

  function fillMessage(e: any) {
    const textAreaValue = e.target.value;
    setComment(textAreaValue);
  }

  function handleCloseSnackbar() {
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
  }

  function handleUploadPhoto() {
    imgInputRef?.current?.click();
  }

  function fileSelectedHandler(e: any) {
    if (images.length === 0) {
      setImages((prev) => [...prev, ...e.target.files]);
    } else {
      const sos = images.filter(
        (item) => item?.lastModified !== e.target.files[0]?.lastModified
      );
      setImages([...sos, ...e.target.files]);
    }
  }

  function removeImage(imgData: any) {
    const remainedImages = images.filter(
      (item: any, index: number) =>
        item?.size !== imgData?.size &&
        item?.lastModified !== imgData?.lastModified
    );
    setImages([...remainedImages]);
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + ".jpg", { type: mime });
  }

  const exportAsImage = async (el, imageFileName) => {
    // console.log(getElementIdForReportScreenShot);
    const input = document.getElementById(getElementIdForReportScreenShot);
    const canvas = await html2canvas(input);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };

  const downloadImage = (blob, fileName) => {
    setImages((prev) => [...prev, dataURLtoFile(blob, fileName)]);
    const fakeLink = window.document.createElement("img");
    // fakeLink.width = 34;
    // fakeLink.height = 64;
    fakeLink.src = blob;
  };

  useEffect(() => {
    if (!opentReportSpecialContentBottomSheet) {
      if (images.length > 0) {
        // setTimeout(function () {
        setImages([]);
        // }, 2000);
      }
    }
  }, [images.length, opentReportSpecialContentBottomSheet]);

  function takeScreenShot() {
    exportAsImage(exportRef.current, "test");
  }
  return (
    <>
      <LottieLoading
        open_lottie={openLoading}
        customLoading={true}
        width={110}
        height={110}
      />
      <Sheet
        className="report-special-content-bottomsheet"
        onClose={handleCloseSpecialReport}
        isOpen={opentReportSpecialContentBottomSheet}
        onOpenEnd={takeScreenShot}
      >
        <Sheet.Container>
          <Sheet.Header>
            <CommonBottomSheetHeader
              title={
                (pathname.split("/")[2] === "report" ||
                  pathname.split("/")[1] === "") &&
                visibleTipBottomSheet === false
                  ? "گزارش"
                  : `گزارش اشکال : ${getReportCategoryTitle}`
              }
              submitReportBottomSheet={submitReportBottomSheet}
              setImages={setImages}
            />
          </Sheet.Header>
          <Sheet.Content>
            <Box
              className="comment-body-wrapper"
              sx={{ backgroundColor: "background.main" }}
            >
              <ReportTextArea fillMessage={fillMessage} comment={comment} />

              <Box className="uploadedImagesWrapper">
                <ImageAndRemoveButton
                  imageCollections={images}
                  removeImage={removeImage}
                />
                <UploadReportedFile
                  imageCollections={images}
                  handleUploadPhoto={handleUploadPhoto}
                  fileSelectedHandler={fileSelectedHandler}
                  imgInputRef={imgInputRef}
                />
              </Box>
            </Box>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={handleCloseSpecialReport} />
      </Sheet>

      <CommonErrorSnackBar
        openErrorSnackbar={openErrorSnackbar}
        closeSnackBar={handleCloseSnackbar}
        text="مجددا تلاش کنید"
      />
      <CommonSuccessSnackBar
        openSuccessSnackbar={openSuccessSnackbar}
        closeSnackBar={handleCloseSnackbar}
        type="success-report"
      />
    </>
  );
}

export default ReportSpecialContentBottomSheet;
