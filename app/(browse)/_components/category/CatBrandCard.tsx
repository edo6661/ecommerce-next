import { Category } from "@prisma/client";
import Image from "next/image";

const CatBrandCard = ({ name, photo }: Category) => {
  return (
    <div className="cardCatBrand">
      <Image
        src={photo}
        alt={name}
        width={88}
        height={88}
        className="rounded-full min-w-[88px] min-h-[88px]"
      />
      <p>{name}</p>
    </div>
  );
};

export default CatBrandCard;
