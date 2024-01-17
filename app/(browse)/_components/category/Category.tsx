import { getCategory } from "@/services/category";
import React from "react";
import CategoryCard from "./CategoryCard";
import CategorySwiper from "./CategorySwiper";
import { montserrat } from "@/lib/utils";

export const Category = async () => {
  const category = await getCategory();

  return (
    <>
      <article>
        <h3 className={`${montserrat.className} title`}>Kategori</h3>
        <CategorySwiper category={category} />
      </article>
    </>
  );
};
