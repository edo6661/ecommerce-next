import Title from "@/components/shared/Title";
import React from "react";
import { FaStar } from "react-icons/fa";
import ProgressRating from "./ProgressRating";

const RatingConclusion = () => {
  return (
    <>
      <Title label="Mock Conclusion" className=" " />
      <div className="flex flex-col gap-2 items-center ">
        <div className="flex text-xl gap-2 text-center">
          <span>
            <FaStar size={30} color="yellow" />
          </span>
          <p>
            4.8 <span>/5.0</span>
          </p>
        </div>
        <p>300 Mock • 120 ulasan</p>
      </div>
      <ProgressRating />
    </>
  );
};

export default RatingConclusion;
