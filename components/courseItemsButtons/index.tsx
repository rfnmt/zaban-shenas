import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Free from "./free";
import DisableAndLocked from "./disableAndLocked";
import PreviewBeforePurchase from "./previewBeforePurchase";
import OnlyByPurchase from "./onlyByPurchase";
import { ICourse } from "@/app/select-grade/interfaces";
import { changeUserCurrentCourse } from "@/providers/Dexie/courses";
import { useCurrentCourseData } from "../spalashScreen/hook/useCurrentCourseData";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

import "./styles.scss";
import { updateProccessingSessionStates } from "@/providers/Redux/home/homeSlice";
interface IProps {
  courseData: ICourse;
  studyPercent: number;
}

function CourseButtons(data: IProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { courseData } = data;

  const { refetch: requestToGetCurrentCourseAllData, isLoading } =
    useCurrentCourseData();

  function updateCurrentCourse() {
    changeUserCurrentCourse(courseData?.id)
      .then(function () {
        dispatch(updateProccessingSessionStates("waiting"));
        queryClient.setQueryData(["user-current-course-id"], courseData.id);
        requestToGetCurrentCourseAllData();
      })
      .then(() => router.push("/"));
  }

  function renderButtonType() {
    switch (courseData.access_type) {
      case "free":
        return (
          <Free
            callback={updateCurrentCourse}
            studyPercent={courseData.studyPercent}
          />
        );

      case "preview_before_purchase":
        return (
          <PreviewBeforePurchase
            callback={updateCurrentCourse}
            studyPercent={courseData.studyPercent}
            purchaseID={courseData.purchasable}
          />
        );

      case "only_by_purchase":
        return (
          <OnlyByPurchase
            callback={updateCurrentCourse}
            studyPercent={courseData.studyPercent}
            purchaseID={courseData.purchasable}
          />
        );

      case "freemium":
        return <DisableAndLocked />;

      default:
        break;
    }
  }

  return <div className="start-study-lesson-buttons">{renderButtonType()}</div>;
}

export default CourseButtons;
