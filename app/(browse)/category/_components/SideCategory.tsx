import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/services/category";
import Link from "next/link";
import React from "react";
import DropdownCatBrand from "./DropdownCatBrand";
import { Separator } from "@/components/ui/separator";
import SideCategoryCard from "./SideCategoryCard";

const SideCategory = async ({ name }: { name: string }) => {
  const category = await getCategory();
  return (
    <>
      <div className=" space-y-1 ">
        <DropdownCatBrand />
        <SideCategoryCard name={name} category={category} />
      </div>
      <Separator />
    </>
  );
};

export default SideCategory;
