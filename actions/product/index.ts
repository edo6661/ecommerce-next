"use server";

import {
  createBrand,
  createCategory,
  createProduct,
  editProduct,
} from "@/services/product";
import { ConvertedProductType } from "@/types/Product";
import { ActionsData, ProductData } from "@/utils/zodSchema";
import { revalidatePath } from "next/cache";

export const addProduct = async (body: ConvertedProductType) => {
  try {
    const product = await createProduct(body);
    revalidatePath("/");
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateProduct = async (body: ConvertedProductType) => {
  try {
    const product = await editProduct(body);
    revalidatePath(`/product/${body.id}`);
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addCategory = async (body: ActionsData) => {
  const category = await createCategory(body);
  revalidatePath("/");
  return category;
};

export const addBrand = async (body: ActionsData) => {
  const brand = await createBrand(body);
  revalidatePath("/");
  return brand;
};
