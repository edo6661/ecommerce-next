import Title from "@/components/shared/Title";
import Link from "next/link";
import React from "react";
import ProductSwiper from "./ProductSwiper";
import { Separator } from "@/components/ui/separator";
import PhotosRatingCustomer from "./PhotosRatingCustomer";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Product } from "@prisma/client";

const BottomSectionProduct = ({
  username,
  ownerProducts,
}: {
  username: string;
  ownerProducts: Product[];
}) => {
  return (
    <>
      <div className=" fl-center justify-between ">
        <Title label="Lainnya di toko ini" />
        <Link className=" hoveredText font-semibold " href={`/${username}`}>
          Lihat semua
        </Link>
      </div>
      <div>
        <ProductSwiper ownerProducts={ownerProducts} />
      </div>
      <Separator />
      <div className=" fl-center justify-between ">
        <Title label="Ulasan Pembeli" />
        <Link className=" hoveredText font-semibold " href={`/${username}`}>
          Lihat semua
        </Link>
      </div>
      <PhotosRatingCustomer />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Image
            src="https://i.pinimg.com/236x/36/18/c5/3618c544af9803004da77bf7847ce217.jpg"
            alt="rating"
            width={52}
            height={44}
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <p>Riski</p>
            <p>27 Ulasan Mock</p>
          </div>
        </div>
        <div className="fl-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} color="yellow" size={20} />
          ))}
          <p>10 Bulan lalu</p>
        </div>
        <p>Barang sesuai deskripsi, packing oke banget, pengiriman sesuai!</p>
      </div>
    </>
  );
};

export default BottomSectionProduct;
