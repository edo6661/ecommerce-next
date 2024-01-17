import { getProductById } from "@/services/product";
import React from "react";
import { getCategory } from "@/services/category";
import { getBrand } from "@/services/brand";
import { getSelf } from "@/services/user";
import { updateProduct } from "@/actions/product";
import AddProductForm from "@/components/shared/product/ActionsProductForm";
import ActionsProductForm from "@/components/shared/product/ActionsProductForm";

interface Props {
  params: { id: string };
}

const EditProduct = async ({ params }: Props) => {
  const product = await getProductById(params.id);
  const category = await getCategory();
  const brand = await getBrand();
  const owner = await getSelf();

  const initialProduct = {
    id: params.id,
    name: product?.name ?? "",
    description: product?.description ?? "",
    discountPrice: (product?.discountPrice ?? 0).toString(),
    price: (product?.price ?? 0).toString(),
    quantity: (product?.quantity ?? 0).toString(),
    brandId: product?.brandId ?? "",
    categoryId: product?.categoryId ?? "",
    photos: (product?.photos ?? "").split(","),
  };

  return (
    <section className="container">
      <ActionsProductForm
        label="Edit"
        product={initialProduct}
        category={category}
        owner={owner}
        brand={brand}
        actions={updateProduct}
      />
    </section>
  );
};
export default EditProduct;
