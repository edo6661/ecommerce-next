"use client";

import useMugi from "@/hooks/useMugi";
import { Menu } from "lucide-react";

const ToggleNav = () => {
  const { toggleNav } = useMugi((state) => state);
  return (
    <button className="sm:hidden block z-10 clickable " onClick={toggleNav}>
      <Menu className=" w-8 h-8" />
    </button>
  );
};

export default ToggleNav;
