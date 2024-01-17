"use client";
import {
  firstMockPosters,
  secondMockPoster,
  thirdMockPoster,
} from "@/helpers/initial";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { posterSlideVars } from "@/utils/framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ActionButton from "./ActionsButton";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { cn } from "@/lib/utils";

const Posters = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) =>
      prev === firstMockPosters.length - 1 ? 0 : prev + 1
    );
  };
  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) =>
      prev === 0 ? firstMockPosters.length - 1 : prev - 1
    );
  };

  const hovered = () => setIsHover(true);
  const unhovered = () => setIsHover(false);

  useEffect(() => {
    if (!isHover) {
      const autoSlide = setInterval(() => handleNextSlide(), 2500);
      return () => clearInterval(autoSlide);
    }
  }, [isHover]);

  const bothMiniPosters = (
    <>
      <div className="sm:block hidden">
        <Image
          src={secondMockPoster}
          alt="poster 2"
          width={398}
          height={115}
          className="w-full"
        />
      </div>
      <div className="sm:block hidden">
        <Image
          src={thirdMockPoster}
          alt="poster 3"
          width={398}
          height={115}
          className="w-full"
        />
      </div>
    </>
  );

  return (
    <>
      <div
        className=" sm:col-span-2 col-span-full sm:row-span-2 relative overflow-x-hidden"
        onMouseEnter={hovered}
        onMouseLeave={unhovered}
      >
        <AnimatePresence initial={false} custom={direction}>
          <div>
            <motion.img
              key={firstMockPosters[currentSlide]}
              variants={posterSlideVars}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              src={firstMockPosters[currentSlide]}
              alt={`Poster ${currentSlide}`}
              width={796}
              height={235}
              className="w-full "
            />
          </div>
        </AnimatePresence>
        <ActionButton
          isHover={isHover}
          onClick={handlePrevSlide}
          direction="left"
        >
          <ChevronLeft />
        </ActionButton>

        <ActionButton
          isHover={isHover}
          onClick={handleNextSlide}
          direction="right"
        >
          <ChevronRight />
        </ActionButton>
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 flex items-center">
          {Array.from({ length: firstMockPosters.length }).map((_, i) => {
            const activeSlide = i === currentSlide;
            return (
              <div key={i} className="">
                <button
                  className={cn(" opacity-50 transition-opacity duration-300", {
                    "opacity-100": activeSlide,
                  })}
                  onClick={() => setCurrentSlide(i)}
                >
                  {activeSlide ? (
                    <GoDotFill size={22} color="white" />
                  ) : (
                    <GoDot size={22} color="white" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {bothMiniPosters}
    </>
  );
};

export default Posters;
