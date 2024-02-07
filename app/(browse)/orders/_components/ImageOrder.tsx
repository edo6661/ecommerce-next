"use client";
import { upperFirst } from "@/helpers";
import { productCardProps } from "@/utils/framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  url: string;
}
const ImageOrder = ({ name, url }: Props) => {
  return (
    <motion.div
      variants={productCardProps}
      initial="initial"
      whileHover="animate"
      exit="exit"
      whileInView="view"
      viewport={{ once: true }}
    >
      <Link href={`/product/${encodeURI(name)}`} className="flex gap-4">
        <Image
          src={url}
          alt={name}
          width={80}
          height={80}
          className=" min-w-24 h-20 rounded-xl "
        />
        <div className="flex flex-col gap-2">
          <p className=" font-medium">{upperFirst(name)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ImageOrder;
