"use client";

import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Category } from "@prisma/client";
import CatBrandCard from "./CatBrandCard";

const CatBrandSwiper = ({
  data,
  label,
}: {
  data: Category[];
  label: string;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const cardSlider = data.map((eachData, i) => (
    <SwiperSlide key={eachData.id}>
      <CatBrandCard {...eachData} label={label} />
    </SwiperSlide>
  ));

  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      breakpoints={{
        368: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
      navigation
    >
      {cardSlider}
    </Swiper>
  );
};

export default CatBrandSwiper;
