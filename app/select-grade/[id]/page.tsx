"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Z3DButton from "@/components/Z3DButton";
import { Pagination } from "swiper/modules";
import { changeUserCurrentCourse } from "@/providers/Dexie/courses";
import { useCurrentCourseData } from "@/components/spalashScreen/hook/useCurrentCourseData";
import { ICourse, ICourses } from "../interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { updateProccessingSessionStates } from "@/providers/Redux/home/homeSlice";

import "swiper/css";
import "swiper/css/pagination";

import "./style.scss";

function Sub_Course({ data }: { data: ICourses[] }) {
  const router = useRouter();

  function updateCurrentCourse(data: ICourse) {
    changeUserCurrentCourse(data?.id)
      .then(function () {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    router.prefetch("/");
    return () => {};
  }, [router]);

  const [showCurrentpic, setShowCurrentpic] = useState(
    data?.[0]?.data?.thumbnail
  );

  function handleChangeBgPhoto(getSliderIndex: number) {
    for (let index = 0; index < data.length; index++) {
      if (getSliderIndex === index) {
        const element = data[index];
        setShowCurrentpic(element.data.thumbnail);
      }
    }
  }

  return (
    <Box className="sub-course-slider">
      <Box
        sx={{
          backgroundImage: `url(${showCurrentpic})`,
          backgroundSize: "cover",
        }}
        className="filter_backgroundImg"
      />

      <div className="container">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={10}
          centeredSlides={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          onRealIndexChange={(swiper) => handleChangeBgPhoto(swiper.realIndex)}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index} className="sub-course-swiper">
              <div className="slid-image">
                <Image
                  fill
                  alt=""
                  src={item?.data?.thumbnail}
                  className="lesson-items-image"
                />
              </div>

              <Box
                className="lesson-details-wrapper"
                sx={{ backgroundColor: "white.fix" }}
              >
                <Typography className="main-title">
                  {item?.data?.title}
                </Typography>
                <Typography className="count-of-studied-lessons">
                  0 از {item.data.lesson_ids.length} درس
                </Typography>
                <Box className="continue-completed">کامل شد</Box>
                <Typography className="description">
                  {item?.data.description}
                </Typography>
                <Z3DButton onClick={() => updateCurrentCourse(item)}>
                  شروع
                </Z3DButton>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Box>
  );
}

export default Sub_Course;
