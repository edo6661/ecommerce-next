"use client";
import React from "react";
import DropdownRatingCatBrand from "./DropdownRatingCatBrand";
import { Checkbox } from "@/components/ui/checkbox";
import { FaStar } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import useMugi from "@/hooks/useMugi";
const SideRating = () => {
  const { isOnFilteredStar } = useMugi((state) => state);

  return (
    <>
      <AnimatePresence>
        <motion.div className=" " layout>
          <DropdownRatingCatBrand />
          <AnimatePresence>
            {isOnFilteredStar && (
              <motion.div className="fl-center space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className=" fl-center gap-1  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <span>
                      <FaStar size={20} color="yellow" />
                    </span>
                    4 Above
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SideRating;
