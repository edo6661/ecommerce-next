"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import { cardProps } from "@/utils/framer-motion";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { upperFirst } from "@/helpers";
const ProfilePhotoProduct = ({ owner }: { owner: User }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={cardProps}
          initial="initial"
          whileHover="animate"
          exit="exit"
          whileInView="view"
          viewport={{ once: true }}
        >
          <Link href={`/${owner?.username}`}>
            <Image
              src={owner?.profilePhoto!}
              alt={owner?.username!}
              width={80}
              height={60}
              className=" rounded-full"
            />
          </Link>
        </motion.div>
      </AnimatePresence>
      <div className="flex flex-col">
        <Link
          className=" hoveredText font-semibold text-lg"
          href={`/${owner?.username}`}
        >
          {upperFirst(owner?.username!)}
        </Link>

        <p>{owner?.address}</p>
        <p>Tangerang</p>
      </div>
    </>
  );
};

export default ProfilePhotoProduct;
