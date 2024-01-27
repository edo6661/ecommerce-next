"use client";
import { Button } from "@/components/ui/button";
import useMugi from "@/hooks/useMugi";
import { Category } from "@prisma/client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { viewAllVars } from "@/utils/framer-motion";
import { useEffect, useState } from "react";
interface Props {
  category: Category[];
  name: string;
}
const SideCategoryCard = ({ category, name }: Props) => {
  const { isOnFiltered } = useMugi((state) => state);
  const [isViewAll, setIsViewAll] = useState(false);

  const toggleViewAll = () => setIsViewAll((prev) => !prev);

  const optionalFiltered = isOnFiltered ? (isViewAll ? category.length : 5) : 0;

  useEffect(() => {
    !isOnFiltered && setIsViewAll(false);
  }, [isOnFiltered]);

  return (
    <>
      <AnimatePresence>
        <motion.div layout>
          {category
            .sort((a, _) => (a.name.toUpperCase() === name ? -1 : 0))
            .slice(0, optionalFiltered)
            .map((cat) => {
              const currentCat =
                cat.name.toUpperCase() == name ? " focusedWord" : "hoveredText";
              return (
                <div key={cat.id}>
                  <Link
                    href={`/category/${cat.name}`}
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
                  onClick={toggleViewAll}
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

export default SideCategoryCard;
