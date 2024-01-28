import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/services/category";
import Link from "next/link";
import React from "react";
import DropdownCatBrand from "./DropdownCatBrand";
import { Separator } from "@/components/ui/separator";
import SideCatBrandCard from "./SideCatBrandCard";
import { Category } from "@prisma/client";

interface Props {
  name: string;
  getData: () => Promise<Category[]>;
  label: string;
}
const SideCatBrand = async ({ name, getData, label }: Props) => {
  const data = await getData();

  return (
    <>
      <div className=" space-y-1 ">
        <DropdownCatBrand label={label} />
        <SideCatBrandCard label={label} name={name} data={data} />
      </div>
      <Separator />
    </>
  );
};

export default SideCatBrand;
