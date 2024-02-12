"use client";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ImageMagnifier from "./ImageMagnifier";

const SwiperImageProduct = ({
  imageUrls,
  name,
}: {
  imageUrls: string[];
  name: string;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);

  const cardSlider = imageUrls.map((url, i) => (
    <SwiperSlide key={url}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: url === selectedImage ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
        whileHover={{ opacity: 1 }}
      >
        <Image
          src={url}
          alt={`${name} ${i + 1 + 1}`}
          width={112}
          height={72}
          className="notMainImg object-cover "
          onClick={() => setSelectedImage(url)}
        />
      </motion.div>
    </SwiperSlide>
  ));

  return (
    <>
      <ImageMagnifier url={selectedImage} name={name} imageUrls={imageUrls} />

      {imageUrls.length > 1 && (
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={10}
          breakpoints={{
            368: { slidesPerView: 4 },
            640: { slidesPerView: 2 },
            740: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
        >
          {cardSlider}
        </Swiper>
      )}
    </>
  );
};

export default SwiperImageProduct;
