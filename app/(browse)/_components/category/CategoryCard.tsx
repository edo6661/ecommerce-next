import { Category } from "@prisma/client";
import Image from "next/image";
import React from "react";

const CategoryCard = ({ name, photo }: Category) => {
  return (
    <div className="fl-col-center px-2 py-4 text-center gap-2 shadowMuted">
      <Image
        src={photo}
        alt={name}
        width={80}
        height={80}
        className="rounded-full"
      />
      <p>{name}</p>
    </div>
  );
};

export default CategoryCard;
