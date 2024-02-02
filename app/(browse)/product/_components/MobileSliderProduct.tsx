"use client";
import "swiper/css";
import "swiper/css/navigation";

import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import Image from "next/image";
import useWidth from "@/hooks/useWidth";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
const MobileSliderProduct = ({
  imageUrls,
  name,
}: {
  imageUrls: string[];
  name: string;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const cardSlider = imageUrls.map((url, i) => (
    <SwiperSlide key={url}>
      <motion.div
        key={url}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={url}
          alt={`${name} ${i + 1 + 1}`}
          width={560}
          height={360}
          className={cn(" mx-auto rounded-xl object-contain  max-h-[510px]")}
        />
      </motion.div>
    </SwiperSlide>
  ));

  return (
    <>
      {/* <ImageMagnifier url={imageUrls[0]} name={name} imageUrls={imageUrls} /> */}

      {imageUrls.length > 1 && (
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          navigation
        >
          {cardSlider}
        </Swiper>
      )}
    </>
  );
};

export default MobileSliderProduct;
