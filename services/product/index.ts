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

export const getProductByName = async (name: string) => {
  try {
    return db.product.findFirst({
      where: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
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

export const getProductsLengthByCategory = async (name: string) => {
  try {
    return db.category.count({
      where: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const getProductsByOwnerId = async (ownerId: string) => {
  try {
    return db.product.findMany({
      where: {
        ownerId,
      },
      take: 8,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const getProductsByQuery = async (
  query: string,
  limit: number,
  page: number
) => {
  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const filteredProductsLength = await db.product.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(filteredProductsLength / limit);
    return {
      products,
      totalPages,
    };
  } catch (error) {
    console.error(error);

    throw new Error("Internal Error");
  }
};
