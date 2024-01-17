"use client";
import React, { useEffect, useRef } from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "@prisma/client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper as SwiperType } from "swiper/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CategoryData = ({ category }: { category: Category[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const prevSwipe = () => swiperRef.current?.slidePrev();
  const nextSwipe = () => swiperRef.current?.slideNext();

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      grid={{ fill: "column", rows: 2 }}
      initialSlide={6}
      breakpoints={{
        368: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
      className="sm:text-xl md:text-lg lg:text-xl"
    >
      {category.map((cat, i) => (
        <SwiperSlide key={cat.id} virtualIndex={i}>
          <CategoryCard {...cat} />
        </SwiperSlide>
      ))}
      <div className="swipeActions">
        {["left", "right"].map((direction) => {
          const isLeft = direction === "left";
          const styleBaseOnDirection = isLeft ? "left-0" : "right-0";
          return (
            <Button
              key={direction}
              className={`${styleBaseOnDirection} group`}
              onClick={direction === "left" ? prevSwipe : nextSwipe}
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
