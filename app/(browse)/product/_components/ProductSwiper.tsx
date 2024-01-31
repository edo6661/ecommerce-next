"use client";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { Product } from "@prisma/client";
import React from "react";
import ProductsCard from "../../_components/products/ProductsCard";

const ProductSwiper = ({ ownerProducts }: { ownerProducts: Product[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const cardSlider = ownerProducts.map((product, i) => {
    const urls = product.photos.split(",");
    return (
      <SwiperSlide key={product.id}>
        <ProductsCard urls={urls} {...product} />
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
        1250: { slidesPerView: 2 },
        1300: { slidesPerView: 3 },
      }}
      spaceBetween={10}
      navigation
    >
      {cardSlider}
    </Swiper>
  );
};

export default ProductSwiper;
