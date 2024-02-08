"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { upperFirst } from "@/helpers";
import useUserById from "@/hooks/useUserById";
import { Product } from "@prisma/client";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { cardProps, productCardProps } from "@/utils/framer-motion";
import { usePathname } from "next/navigation";
const ProductsCard = ({
  name,
  id,
  urls,
  price,
  discountPrice,
  ownerId,
}: Product & { urls: string[] }) => {
  const { username, isLoading } = useUserById(ownerId);
  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={productCardProps}
          initial="initial"
          whileHover="animate"
          exit="exit"
          whileInView="view"
          viewport={{ once: true }}
          className=" max-w-64 mx-auto h-full"
        >
          <Link
            href={`/product/${encodeURI(name)}`}
            className=" flex flex-col gap-2 sm:text-base text-sm"
          >
            <Image
              className=" pb-1 w-full sm:h-[12rem] h-[144px] rounded-t-md"
              width={256}
              height={256}
              alt={name}
              src={urls[0]}
            />
            <div className="px-3 pb-4">
              <p className=" sm:text-lg ">{upperFirst(name)}</p>
              <div className=" fl-center gap-2">
                <span className=" text-sm">Rp </span>
                <p className=" text-red-200 font-semibold">{price}</p>
              </div>
              <div className="fl-center gap-2 line-through text-muted-foreground  ">
                <span className=" text-sm">Rp </span>
                <p>{discountPrice}</p>
              </div>
              <div className=" sm:fl-center gap-2 font-light">
                <div className="fl-center gap-2">
                  <span>
                    <FaStar color="yellow" size="15" />
                  </span>
                  <p>4.9</p>
                </div>
                <span className="sm:block hidden">|</span>
                <p>100+ Terjual</p>
              </div>
              {isLoading ? (
                <UserSkeleton />
              ) : (
                <>
                  <div className="fl-center gap-2">
                    <span>
                      <FaUser size="15" />
                    </span>
                    <p>{username}</p>
                  </div>
                </>
              )}
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export const UserSkeleton = () => {
  return (
    <div className="fl-center gap-2">
      <span>
        <FaUser size="15" />
      </span>
      <Skeleton className=" w-20 h-6" />
    </div>
  );
};

export const CardProductsSkeleton = () => {
  return (
    <div className=" flex flex-col gap-4 pb-2">
      <Skeleton className=" w-full h-[12rem] rounded-t-md" />
      <div className=" flex flex-col gap-2 px-2">
        <Skeleton className=" w-32 h-5" />
        <div className="flex gap-2">
          <Skeleton className=" w-10 h-5" />
          <Skeleton className=" w-10 h-5" />
        </div>
        <div className="flex gap-2">
          <Skeleton className=" w-10 h-5" />
          <Skeleton className=" w-10 h-5" />
        </div>
        <Skeleton className=" w-32 h-5" />
        <Skeleton className=" w-32 h-5" />
      </div>
    </div>
  );
};

export default ProductsCard;
