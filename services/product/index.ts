import { db } from "@/lib/database";
import { ConvertedProductType } from "@/types/Product";
import { ActionsData, ProductData } from "@/utils/zodSchema";

export const getProducts = async () => {
  return db.product.findMany({}).catch((err) => {
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
      select: {
        id: true,
        name: true,
        description: true,
        discountPrice: true,
        price: true,
        quantity: true,
        photos: true,
        ownerId: true,
        brandId: true,
        categoryId: true,
      },
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
