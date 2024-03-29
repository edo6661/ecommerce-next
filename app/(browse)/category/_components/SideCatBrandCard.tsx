"use client";
import { Button } from "@/components/ui/button";
import useMugi from "@/hooks/useMugi";
import { Category } from "@prisma/client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { viewAllVars } from "@/utils/framer-motion";
import { useEffect, useState } from "react";
interface Props {
  data: Category[];
  name: string;
  label: string;
}
const SideCatBrandCard = ({ data, name, label }: Props) => {
  const { isOnFiltered, isViewAll, isOnViewAllToggle, falseViewAll } = useMugi(
    (state) => state
  );

  const optionalFiltered = isOnFiltered ? (isViewAll ? data.length : 5) : 0;

  useEffect(() => {
    !isOnFiltered && falseViewAll();
  }, [isOnFiltered]);

  const decodedName = decodeURIComponent(name);

  return (
    <>
      <AnimatePresence>
        <motion.div layout>
          {data
            .sort((a, _) => (a.name.toUpperCase() === name ? -1 : 0))
            .slice(0, optionalFiltered)
            .map((cat) => {
              const currentCat =
                cat.name.toUpperCase() == decodedName
                  ? " focusedWord"
                  : "hoveredText";
              return (
                <div key={cat.id}>
                  <Link
                    href={`/${label}/${cat.name}`}
                    className={`${currentCat}`}
                  >
                    {cat.name}
                  </Link>
                </div>
              );
            })}
          <AnimatePresence>
            {isOnFiltered && (
              <motion.div
                variants={viewAllVars}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Button
                  variant="ghost"
                  className=" w-full "
                  onClick={isOnViewAllToggle}
                >
                  {isViewAll ? "View Less" : "View All"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SideCatBrandCard;
