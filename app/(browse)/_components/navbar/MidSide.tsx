"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useMugi from "@/hooks/useMugi";
import { Search } from "lucide-react";
import { RxDividerVertical } from "react-icons/rx";

const MidSide = () => {
  return (
    <div className="fl-center gap-4 flex-1 ">
      <div className="relative flex-1">
        <Input className=" pr-12 pl-4" placeholder="Search..." id="search" />
        <span className="opacity-40 right-6 top-1/2 -translate-y-1/2 absolute">
          <RxDividerVertical size={40} />
        </span>
        <button className=" absolute right-3 top-1/2 -translate-y-1/2 ">
          <Search
            size={22}
            className=" hover:opacity-40 transition-opacity duration-200"
          />
        </button>
      </div>
    </div>
  );
};

export default MidSide;
