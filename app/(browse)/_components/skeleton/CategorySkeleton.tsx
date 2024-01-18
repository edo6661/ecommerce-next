"use client";
import React, { useEffect, useRef } from "react";
import { Category } from "@prisma/client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper as SwiperType } from "swiper/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      initialSlide={6}
      breakpoints={{
        380: { slidesPerView: 2 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
    >
      {Array.from({ length: 30 }).map((cat, i) => (
        <SwiperSlide key={i}>
          <div
            key={i}
            className="fl-col-center px-2 py-4 text-center gap-2 shadowMuted"
          >
            <Skeleton className="rounded-full w-20 h-20" />
            <Skeleton className="w-16 h-6" />
          </div>
        </SwiperSlide>
      ))}
      <div className="swipeActions">
        {["left", "right"].map((direction) => {
          const isLeft = direction === "left";
          const styleBaseOnDirection = isLeft ? "left-0" : "right-0";
          return (
            <Button key={direction} className={`${styleBaseOnDirection} group`}>
              {isLeft ? <ArrowLeft /> : <ArrowRight />}
            </Button>
          );
        })}
      </div>
    </Swiper>
  );
};

export default CategorySkeleton;
