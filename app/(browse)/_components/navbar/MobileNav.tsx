"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useMugi from "@/hooks/useMugi";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import LinksMobile from "./LinksMobile";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/shared/theme";
import { montserrat } from "@/lib/utils";
const MobileNav = () => {
  const ref = useRef<HTMLElement>();
  const { isNav, toggleNav, falseNav } = useMugi((state) => state);
  const pathName = usePathname();
  const router = useRouter();

  const navVars = {
    initial: {
      opacity: 0,
      y: 500,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 500,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    falseNav();
  }, [pathName, falseNav]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".clickable")) isNav && falseNav();
    };
    document.addEventListener("click", handleClickOutside);
    return () => removeEventListener("click", handleClickOutside);
  }, [falseNav, isNav]);

  return (
    <>
      <AnimatePresence>
        {isNav && (
          <motion.div
            className={`sm:hidden flex flex-col  bg-background  absolute z-50 bottom-0 p-8 w-full h-full gap-8 ${montserrat.className}`}
            variants={navVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex gap-2 justify-between clickable">
              <h3 className="text-xl font-semibold">Menu Utama</h3>
              <div className="fl-center gap-4 ">
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <button onClick={toggleNav}>
                  <X size={30} />
                </button>
              </div>
            </div>
            <SignedOut>
              <div className="fl-center gap-4 ">
                <Button
                  className="w-full"
                  onClick={() => router.push("sign-in")}
                >
                  Sign in
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => router.push("sign-up")}
                >
                  Sign up
                </Button>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="fl-center gap-4 ">
                <Button
                  className="w-full"
                  onClick={() => router.push("add-product")}
                >
                  Add Product
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => router.push("sign-up")}
                >
                  Your Profile
                </Button>
              </div>
            </SignedIn>
            <Separator />
            <LinksMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
