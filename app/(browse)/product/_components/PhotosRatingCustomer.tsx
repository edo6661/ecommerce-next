"use client";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { productCardProps } from "@/utils/framer-motion";
import Link from "next/link";
const PhotosRatingCustomer = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const photos = [
    "https://i.pinimg.com/236x/59/00/a3/5900a38cd37bda76eb1794118c59abff.jpg",
    "https://i.pinimg.com/236x/00/1e/b7/001eb73f850de22bde71907693bcf3c8.jpg",
    "https://i.pinimg.com/736x/13/56/9a/13569af515e0f09151d163afcf64f357.jpg",
    "https://i.pinimg.com/236x/d5/88/6c/d5886c3a4c7d158b5f83904493edc28f.jpg",
    "https://i.pinimg.com/236x/bb/87/f8/bb87f89e92f0009c06722947c0a029a5.jpg",
  ];

  const cardSlider = photos.map((photo, i) => {
    return (
      <SwiperSlide key={photo}>
        <AnimatePresence>
          <motion.div
            variants={productCardProps}
            initial="initial"
            whileHover="animate"
            exit="exit"
            whileInView="view"
            viewport={{ once: true }}
            className=" max-w-64 mx-auto h-full pb-4"
          >
            <Link
              href={`/rating/${encodeURI(photo)}`}
              className=" flex flex-col gap-2 sm:text-base text-sm"
            >
              <Image
                className=" pb-1 w-full sm:h-[12rem] h-[144px] rounded-t-md"
                width={256}
                height={256}
                alt={photo}
                src={photo}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      breakpoints={{
        380: { slidesPerView: 2 },
        640: { slidesPerView: 1 },
        856: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      spaceBetween={10}
      navigation
    >
      {cardSlider}
    </Swiper>
  );
};

export default PhotosRatingCustomer;
