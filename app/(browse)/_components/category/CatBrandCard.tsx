import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cardProps } from "@/utils/framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const CatBrandCard = ({ name, photo, label }: Category & { label: string }) => {
  const pathname = usePathname();
  const encodedName = encodeURI(name);
  const optionalColor = pathname.includes(encodedName);
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
            href={`/${label.toLowerCase()}/${encodeURI(name)}`}
            className={cn("cardCatBrand", {
              focusedWord: optionalColor,
            })}
          >
            <Image
              src={photo}
              alt={name}
              width={80}
              height={80}
              className="rounded-xl min-w-[80px] min-h-[80px]"
            />
            <p>{name}</p>
          </Link>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CatBrandCard;
