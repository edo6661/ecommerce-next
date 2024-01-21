import { getCategory } from "@/services/category";
import React from "react";
import { montserrat } from "@/lib/utils";
import CatBrandSwiper from "./CatBrandSwiper";
import { Category } from "@prisma/client";

interface Props {
  getData: () => Promise<Category[]>;
  label: string;
}

export const CatBrand = async ({ getData, label }: Props) => {
  const data = await getData();
  return (
    <>
      <article>
        <h3 className={`${montserrat.className} title`}>{label}</h3>
        <CatBrandSwiper data={data} />
      </article>
    </>
  );
};
