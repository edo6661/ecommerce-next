import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cardProps } from "@/utils/framer-motion";
const CatBrandCard = ({ name, photo, label }: Category & { label: string }) => {
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
          <Link
            href={`/${label.toLowerCase()}/${name}`}
            className="cardCatBrand  "
          >
            <Image
              src={photo}
              alt={name}
              width={88}
              height={88}
              className="rounded-full min-w-[88px] min-h-[88px]"
            />
            <p>{name}</p>
          </Link>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CatBrandCard;
