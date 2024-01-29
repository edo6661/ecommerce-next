import { getProductByName } from "@/services/product";
import { getUserById } from "@/services/user";
import { SignedIn, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

interface Props {
  params: { name: string };
}

const Product = async ({ params }: Props) => {
  const decodedName = decodeURIComponent(params.name);
  const encodedName = encodeURI(decodedName);

  const product = await getProductByName(decodedName);
  const user = await getUserById(product?.ownerId!);

  return (
    <section>
      <p>product {decodedName}</p>
      {/* TODO */}
      {user?.id === product?.ownerId && (
        <Link href={`/product/${encodedName}/edit`}>Edit</Link>
      )}
    </section>
  );
};

export default Product;
