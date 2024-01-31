"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingData {
  value: number;
  progress: number;
  type: string;
}

const ProgressRating = () => {
  const [ratings, _] = useState<RatingData[]>([
    { value: 5, progress: 100, type: "lime" },
    { value: 4, progress: 80, type: "lime" },
    { value: 3, progress: 60, type: "yellow" },
    { value: 2, progress: 40, type: "red" },
    { value: 1, progress: 20, type: "red" },
  ]);

  const renderStars = () => {
    return ratings.map((rating) => (
      <div key={rating.value} className="flex items-center gap-2">
        <span>{rating.value}</span>
        <span>
          <FaStar color="yellow" size={25} />
        </span>
        <div
          style={{
            width: `${rating.progress}%`,
            backgroundColor: rating.type,
          }}
          className=" h-6 rounded-full"
        />
      </div>
    ));
  };

  return <div className="flex flex-col gap-2">{renderStars()}</div>;
};

export default ProgressRating;
