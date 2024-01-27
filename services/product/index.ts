"use server";
import { db } from "@/lib/database";
import { ConvertedProductType } from "@/types/Product";
import { ActionsData, ProductData } from "@/utils/zodSchema";

export const getProductsWithPageLimit = async (page: number, limit: number) => {
  return db.product
    .findMany({
      skip: (page - 1) * limit,
      take: limit,
    })
    .catch((err) => {
      console.error(err);
      throw new Error("failed to fetch products");
    });
};

export const getProductById = async (id: string) => {
  return db.product.findUnique({ where: { id } }).catch((err) => {
    console.error(err);
    throw new Error(`failed to fetch product ${id}`);
  });
};

export const createProduct = async (data: ConvertedProductType) => {
  try {
    const product = await db.product.create({
      data: {
        ...data,
      },
    });
    return product;
  } catch (err) {
    console.error(err);
    throw new Error(`failed to fetch products`);
  }
};

export const editProduct = async (data: ConvertedProductType) => {
  try {
    const product = await db.product.update({
      where: { id: data.id },
      data: { ...data },
    });

    return product;
  } catch (err) {
    console.error(err);
    throw new Error(`failed to edit products`);
  }
};

export const createCategory = async (data: ActionsData) => {
  try {
    const category = await db.category.create({
      data: {
        ...data,
      },
    });
    return category;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};

export const createBrand = async (data: ActionsData) => {
  try {
    const brand = await db.brand.create({
      data: {
        ...data,
      },
    });
    return brand;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};

export const getProductsByCategory = async (name: string) => {
  try {
    return db.product.findMany({
      where: {
        category: {
          name,
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};
