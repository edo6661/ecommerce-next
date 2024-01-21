"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Category } from "@prisma/client";
import CatBrandCard from "./CatBrandCard";

const CatBrandSwiper = ({ data }: { data: Category[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [end, setEnd] = useState(false);
  const [first, setFirst] = useState(true);

  const cardSlider = data.map((eachData, i) => (
    <SwiperSlide key={eachData.id}>
      <CatBrandCard {...eachData} />
    </SwiperSlide>
  ));

  const prevSwipe = () => swiperRef.current?.slidePrev();
  const nextSwipe = () => swiperRef.current?.slideNext();

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      breakpoints={{
        368: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
      // onReachEnd={() => {
      //   return console.log("test");
      // }}
      // onReachBeginning={() => {
      //   return console.log("first");
      // }}
    >
      {cardSlider}
      <div className="swipeActions">
        {["left", "right"].map((direction) => {
          const isLeft = direction === "left";
          const styleBasedOnDirection = isLeft ? "left-0" : "right-0";
          return (
            <Button
              key={direction}
              className={styleBasedOnDirection}
              onClick={isLeft ? prevSwipe : nextSwipe}
              disabled={isLeft ? first : end}
            >
              {isLeft ? <ArrowLeft /> : <ArrowRight />}
            </Button>
          );
        })}
      </div>
    </Swiper>
  );
};

export default CatBrandSwiper;
