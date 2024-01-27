"use client";
import Title from "@/components/shared/Title";
import useMugi from "@/hooks/useMugi";
import { AnimatePresence } from "framer-motion";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dropdownVars } from "@/utils/framer-motion";
const DropdownCatBrand = () => {
  const { isOnFilteredToggle, isOnFiltered } = useMugi((state) => state);

  return (
    <>
      <button
        className="fl-center justify-between w-full group"
        onClick={isOnFilteredToggle}
      >
        <Title label="Category" />
        <AnimatePresence>
          <motion.span
            variants={dropdownVars}
            animate={isOnFiltered ? "animate" : "exit"}
            className={cn("group-hover:opacity-85 duration-300", {
              "group-hover:animate-pulse": !isOnFiltered,
            })}
          >
            <IoIosArrowDropupCircle size={25} />
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
};

export default DropdownCatBrand;
