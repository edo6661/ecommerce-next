import React from "react";
import { getCategory } from "@/services/category";
import { getBrand } from "@/services/brand";
import { getSelf } from "@/services/user";
import { updateProduct } from "@/actions/product";
import ActionsProductForm from "@/components/shared/product/ActionsProductForm";
import { getProductByName } from "@/services/product";
import { upperFirst } from "@/helpers";
import { notFound } from "next/navigation";
import { ResolvingMetadata } from "next";

interface Props {
  params: { name: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const product = await getProductByName(decodeURIComponent(params.name));
  if (!product) {
    return notFound();
  }
  const previousImage = (await parent).openGraph?.images || [];

  return {
    title: product.name
      ? `Edit ${upperFirst(product.name)}`
      : `Edit ${upperFirst(decodeURIComponent(params.name))}`,
    description: product?.description,
    openGraph: {
      images: product?.photos
        ? [{ url: product.photos.split(",")[0] }, ...previousImage]
        : previousImage,
    },
  };
}

const EditProduct = async ({ params }: Props) => {
  const product = await getProductByName(decodeURIComponent(params.name));
  const category = await getCategory();
  const brand = await getBrand();
  const owner = await getSelf();

  const initialProduct = {
    id: product?.id,
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
