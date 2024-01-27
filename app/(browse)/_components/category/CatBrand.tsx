import { getCategory } from "@/services/category";
import React from "react";
import { montserrat } from "@/lib/utils";
import CatBrandSwiper from "./CatBrandSwiper";
import { Category } from "@prisma/client";
import Title from "@/components/shared/Title";

interface Props {
  getData: () => Promise<Category[]>;
  label: string;
}

export const CatBrand = async ({ getData, label }: Props) => {
  const data = await getData();
  return (
    <>
      <article>
        <Title label={label} />
        <CatBrandSwiper data={data} label={label} />
      </article>
    </>
  );
};
