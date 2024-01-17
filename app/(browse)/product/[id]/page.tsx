import { getProductById } from "@/services/product";
import Link from "next/link";
import React from "react";

interface Props {
  params: { id: string };
}

const Product = async ({ params }: Props) => {
  const product = await getProductById(params.id);

  return (
    <section>
      <p>product {params.id}</p>
      <Link href={`/product/${params.id}/edit`}>Edit</Link>
    </section>
  );
};

export default Product;
