import Title from "@/components/shared/Title";
import useMugi from "@/hooks/useMugi";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { dropdownVars } from "@/utils/framer-motion";
import { cn } from "@/lib/utils";

const DropdownRatingCatBrand = () => {
  const { isOnFilteredStarToggle, isOnFilteredStar } = useMugi(
    (state) => state
  );
  return (
    <>
      <div className="fl-center justify-between"></div>
      <button
        className="fl-center justify-between w-full group"
        onClick={isOnFilteredStarToggle}
      >
        <Title label="Mock" />
        <AnimatePresence>
          <motion.span
            variants={dropdownVars}
            animate={isOnFilteredStar ? "animate" : "exit"}
            className={cn("group-hover:opacity-85 duration-300", {
              "group-hover:animate-pulse": !isOnFilteredStar,
            })}
          >
            <IoIosArrowDropupCircle size={25} />
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
};

export default DropdownRatingCatBrand;
