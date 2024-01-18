"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { useEffect, useRef } from "react";

import CategoryCard from "./CategoryCard";

import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Category } from "@prisma/client";

const CategoryData = ({ category }: { category: Category[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const cardSlider = category.map((cat, i) => (
    <SwiperSlide key={cat.id}>
      <CategoryCard {...cat} />
    </SwiperSlide>
  ));
  const prevSwipe = () => swiperRef.current?.slidePrev();
  const nextSwipe = () => swiperRef.current?.slideNext();

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      initialSlide={6}
      breakpoints={{
        368: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
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
            >
              {isLeft ? <ArrowLeft /> : <ArrowRight />}
            </Button>
          );
        })}
      </div>
    </Swiper>
  );
};

export default CategoryData;
