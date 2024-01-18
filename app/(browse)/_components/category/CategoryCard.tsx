import { Category } from "@prisma/client";
import Image from "next/image";

const CategoryCard = ({ name, photo }: Category) => {
  return (
    <div className="cardCategory">
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
