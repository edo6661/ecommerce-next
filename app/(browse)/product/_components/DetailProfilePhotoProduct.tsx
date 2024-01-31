import { Button } from "@/components/ui/button";
import React from "react";
import { FaClock, FaStar } from "react-icons/fa";

const DetailProfilePhotoProduct = () => {
  return (
    <>
      <div className="md:text-sm lg:text-base text-base">
        <div className="fl-center gap-2 ">
          <span>
            <FaStar />
          </span>
          <p>
            <span className="text-muted-foreground">4.9 </span>
            Average Rating
          </p>
        </div>
        <div className="fl-center gap-2">
          <span>
            <FaClock />
          </span>
          <p>
            <span className="text-muted-foreground">4.8 </span>
            Order Process
          </p>
        </div>
      </div>
      <Button>Follow</Button>
    </>
  );
};

export default DetailProfilePhotoProduct;
