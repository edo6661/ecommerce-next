import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = ({ name, id, urls }: Product & { urls: string[] }) => {
  return (
    <Link href={`product/${id}`}>
      <Image
        className="rounded-xl"
        width={256}
        height={256}
        alt={name}
        src={urls[0]}
      />
    </Link>
  );
};

export default Products;
