import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { upperFirst } from "@/helpers";
import Image from "next/image";
import React from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

interface Props {
  decodedName: string;
  price: number;
  discountPrice: number;
  description: string;
}

const SpecificProduct = ({
  decodedName,
  price,
  discountPrice,
  description,
}: Props) => {
  return (
    <>
      <Title label={upperFirst(decodedName)} />
      <div className="space-y-1">
        <div className="fl-center gap-2 ">
          <p>Sold 100+</p>
          <span>
            <FaStar color="yellow" size={20} />
          </span>
          <span>4.9</span>
          <span className=" text-muted-foreground">(19)</span>
        </div>
        <div className="fl-center justify-between">
          <div className="fl-center gap-2">
            <p className=" text-xl font-semibold">Rp {price}</p>
            <Image
              src="/free-ship.png"
              alt="free-shipping"
              width={40}
              height={40}
              className=" dark:hidden block"
            />
          </div>
        </div>
        <div className="fl-center gap-2 font-semibold pb-2 text-lg">
          <p className=" text-red-500 ">20%</p>
          <p className="line-through text-muted-foreground ">
            Rp {discountPrice}
          </p>
        </div>
        <Separator />
        <div>
          <Title label="Detail Product" />
          <p>{description}</p>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default SpecificProduct;
